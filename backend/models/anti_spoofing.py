import torch
import torch.nn as nn
import torch.nn.functional as F
from efficientnet_pytorch import EfficientNet
from typing import Tuple, List, Optional
import numpy as np
import cv2
from skimage.feature import local_binary_pattern
from scipy.stats import entropy

class TextureAnalysis:
    def __init__(self):
        self.n_points = 24
        self.radius = 3
        self.n_bins = 256
        
    def compute_lbp(self, image: np.ndarray) -> np.ndarray:
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        lbp = local_binary_pattern(gray, self.n_points, self.radius, method='uniform')
        return lbp
    
    def compute_lbp_histogram(self, lbp: np.ndarray) -> np.ndarray:
        hist, _ = np.histogram(lbp.ravel(), bins=self.n_bins, range=(0, self.n_bins))
        hist = hist.astype('float32')
        hist /= (hist.sum() + 1e-7)
        return hist
    
    def analyze_texture_uniformity(self, image: np.ndarray) -> dict:
        lbp = self.compute_lbp(image)
        hist = self.compute_lbp_histogram(lbp)
        
        # Compute texture entropy
        texture_entropy = entropy(hist)
        
        # Compute texture contrast
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        contrast = cv2.Laplacian(gray, cv2.CV_64F).var()
        
        return {
            'entropy': float(texture_entropy),
            'contrast': float(contrast),
            'histogram': hist
        }

class ReflectionAnalysis:
    def __init__(self):
        self.block_size = 8
        
    def detect_specular_reflections(self, image: np.ndarray) -> dict:
        # Convert to HSV for better highlight detection
        hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
        v_channel = hsv[:, :, 2]
        
        # Detect highlights using adaptive thresholding
        thresh = cv2.adaptiveThreshold(
            v_channel, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY, 11, 2
        )
        
        # Analyze reflection patterns
        reflection_ratio = np.sum(thresh > 0) / thresh.size
        
        # Compute reflection uniformity
        blocks = self.split_into_blocks(thresh)
        block_means = np.mean(blocks, axis=(2, 3))
        uniformity = np.std(block_means)
        
        return {
            'reflection_ratio': float(reflection_ratio),
            'uniformity': float(uniformity),
            'highlight_mask': thresh
        }
    
    def split_into_blocks(self, image: np.ndarray) -> np.ndarray:
        h, w = image.shape
        nh = h // self.block_size
        nw = w // self.block_size
        
        return image[:nh*self.block_size, :nw*self.block_size].reshape(
            nh, self.block_size, nw, self.block_size
        )

class FrequencyAnalysis:
    def analyze_frequency_distribution(self, image: np.ndarray) -> dict:
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Compute FFT
        f_transform = np.fft.fft2(gray)
        f_shift = np.fft.fftshift(f_transform)
        magnitude_spectrum = np.abs(f_shift)
        
        # Analyze frequency distribution
        high_freq_mask = self.create_high_freq_mask(magnitude_spectrum.shape)
        low_freq_mask = 1 - high_freq_mask
        
        high_freq_energy = np.sum(magnitude_spectrum * high_freq_mask)
        low_freq_energy = np.sum(magnitude_spectrum * low_freq_mask)
        freq_ratio = high_freq_energy / (low_freq_energy + 1e-7)
        
        return {
            'frequency_ratio': float(freq_ratio),
            'high_freq_energy': float(high_freq_energy),
            'low_freq_energy': float(low_freq_energy)
        }
    
    def create_high_freq_mask(self, shape: tuple) -> np.ndarray:
        rows, cols = shape
        crow, ccol = rows//2, cols//2
        mask = np.ones((rows, cols))
        
        # Create circular mask for high frequencies
        radius = min(rows, cols) // 4
        y, x = np.ogrid[-crow:rows-crow, -ccol:cols-ccol]
        mask_area = x*x + y*y <= radius*radius
        mask[mask_area] = 0
        
        return mask

class AntiSpoofingModel(nn.Module):
    def __init__(self, num_classes: int = 2, temporal_length: int = 10):
        super(AntiSpoofingModel, self).__init__()
        
        # Load pre-trained EfficientNet
        self.backbone = EfficientNet.from_pretrained('efficientnet-b0')
        
        # Feature dimensions
        self.feature_dim = self.backbone._fc.in_features
        self.backbone._fc = nn.Identity()
        
        # Spatial attention
        self.spatial_attention = nn.Sequential(
            nn.Conv2d(1280, 128, kernel_size=1),
            nn.ReLU(),
            nn.Conv2d(128, 1, kernel_size=1),
            nn.Sigmoid()
        )
        
        # Texture analysis branch
        self.texture_conv = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        
        # Reflection analysis branch
        self.reflection_conv = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        
        # Classification layers
        self.dropout = nn.Dropout(0.5)
        self.fc1 = nn.Linear(self.feature_dim + 256, 512)  # Combined features
        self.fc2 = nn.Linear(512, num_classes)

    def forward(self, x: torch.Tensor) -> dict:
        # Extract backbone features
        features = self.backbone.extract_features(x)
        
        # Spatial attention
        spatial_attention = self.spatial_attention(features)
        attended_features = features * spatial_attention
        
        # Global average pooling
        pooled_features = F.adaptive_avg_pool2d(attended_features, (1, 1))
        pooled_features = pooled_features.view(pooled_features.size(0), -1)
        
        # Texture and reflection analysis
        texture_features = self.texture_conv(x).view(x.size(0), -1)
        reflection_features = self.reflection_conv(x).view(x.size(0), -1)
        
        # Combine all features
        combined_features = torch.cat([
            pooled_features,
            texture_features,
            reflection_features
        ], dim=1)
        
        # Classification
        x = self.dropout(combined_features)
        x = F.relu(self.fc1(x))
        logits = self.fc2(x)
        
        return {
            'logits': logits,
            'spatial_attention': spatial_attention,
            'texture_features': texture_features,
            'reflection_features': reflection_features
        }

class AntiSpoofingPredictor:
    def __init__(self, model_path: str = None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = AntiSpoofingModel().to(self.device)
        
        if model_path:
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        
        self.model.eval()
        
        # Analysis modules
        self.texture_analyzer = TextureAnalysis()
        self.reflection_analyzer = ReflectionAnalysis()
        self.frequency_analyzer = FrequencyAnalysis()
        
        # Preprocessing parameters
        self.mean = np.array([0.485, 0.456, 0.406])
        self.std = np.array([0.229, 0.224, 0.225])

    def preprocess_image(self, image: np.ndarray) -> torch.Tensor:
        # Normalize to [0, 1]
        image = image.astype(np.float32) / 255.0
        
        # Standardize
        image = (image - self.mean) / self.std
        
        # To tensor and add batch dimension
        image = torch.from_numpy(image).permute(2, 0, 1).unsqueeze(0)
        return image.to(self.device)

    def predict(self, image: np.ndarray) -> dict:
        with torch.no_grad():
            # Preprocess image
            x = self.preprocess_image(image)
            
            # Model prediction
            outputs = self.model(x)
            logits = outputs['logits']
            probs = F.softmax(logits, dim=1)
            
            # Get prediction
            pred_class = torch.argmax(probs, dim=1).item()
            confidence = probs[0][pred_class].item()
            
            # Additional analysis
            texture_analysis = self.texture_analyzer.analyze_texture_uniformity(image)
            reflection_analysis = self.reflection_analyzer.detect_specular_reflections(image)
            frequency_analysis = self.frequency_analyzer.analyze_frequency_distribution(image)
            
            # Convert attention map for visualization
            attention_map = outputs['spatial_attention'].squeeze().cpu().numpy()
            
            # Combine all analysis results
            return {
                'isReal': bool(pred_class == 1),
                'confidence': float(confidence),
                'attention_map': attention_map,
                'texture_analysis': texture_analysis,
                'reflection_analysis': reflection_analysis,
                'frequency_analysis': frequency_analysis
            }