import axios from 'axios';

// In a real implementation, this would connect to your FastAPI backend
// For now, we'll simulate the API response

export const detectFaceSpoofing = async (imageData: string): Promise<any> => {
  try {
    // In a real implementation:
    // const response = await axios.post('/api/detect', { image: imageData });
    // return response.data;
    
    // Simulated response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    
    // Randomly decide if the face is real or spoofed for demo purposes
    const isReal = Math.random() > 0.5;
    
    const attackTypes = ['Print Attack', 'Digital Screen Attack', '3D Mask', 'Deepfake'];
    const randomAttackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    
    return {
      isReal,
      confidence: isReal ? 0.7 + (Math.random() * 0.28) : 0.65 + (Math.random() * 0.3),
      attackType: isReal ? undefined : randomAttackType,
      gradCamData: {
        // This would contain actual gradCAM data in a real implementation
        highlights: [
          { x: 100, y: 150, intensity: 0.8 },
          { x: 200, y: 120, intensity: 0.9 },
        ]
      }
    };
  } catch (error) {
    console.error('Error during face spoofing detection:', error);
    throw new Error('Failed to process face spoofing detection');
  }
};

export const getDetectionMetrics = async (): Promise<any> => {
  try {
    // In a real implementation:
    // const response = await axios.get('/api/metrics');
    // return response.data;
    
    // Simulated response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      accuracy: 96.8,
      falsePositiveRate: 1.2,
      falseNegativeRate: 2.8,
      averageProcessingTime: 412,
      detectionsByType: {
        print: 85,
        digital: 90,
        mask: 70,
        deepfake: 75
      }
    };
  } catch (error) {
    console.error('Error fetching detection metrics:', error);
    throw new Error('Failed to fetch detection metrics');
  }
};