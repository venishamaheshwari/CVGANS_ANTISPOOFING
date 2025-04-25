import torch
from facenet_pytorch import MTCNN
import numpy as np
import cv2
from typing import Optional, Dict, Any

class FaceDetector:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.mtcnn = MTCNN(
            keep_all=True,
            device=self.device,
            thresholds=[0.6, 0.7, 0.7],  # Stricter thresholds for better detection
            min_face_size=60
        )

    def detect_face(self, image: np.ndarray) -> Optional[Dict[str, Any]]:
        # Convert BGR to RGB if needed
        if len(image.shape) == 3 and image.shape[2] == 3:
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        else:
            image_rgb = image

        # Detect faces
        boxes, probs = self.mtcnn.detect(image_rgb)
        
        if boxes is None or len(boxes) == 0:
            return None

        # Get the face with highest probability
        best_idx = np.argmax(probs)
        box = boxes[best_idx]
        
        # Convert box coordinates to integers
        x1, y1, x2, y2 = map(int, box)
        
        # Add margin to the face region
        margin = 20
        h, w = image.shape[:2]
        x1 = max(0, x1 - margin)
        y1 = max(0, y1 - margin)
        x2 = min(w, x2 + margin)
        y2 = min(h, y2 + margin)
        
        return {
            'x': x1,
            'y': y1,
            'width': x2 - x1,
            'height': y2 - y1,
            'confidence': float(probs[best_idx])
        }

    def align_face(self, image: np.ndarray, face_location: Dict[str, Any], target_size: tuple = (224, 224)) -> np.ndarray:
        x, y = face_location['x'], face_location['y']
        w, h = face_location['width'], face_location['height']
        
        # Extract and resize face region
        face = image[y:y+h, x:x+w]
        face_resized = cv2.resize(face, target_size)
        
        return face_resized