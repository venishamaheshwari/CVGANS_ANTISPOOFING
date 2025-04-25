import axios from 'axios';

// In a real implementation, this would connect to your FastAPI backend
// For now, we'll simulate the API response

export const getDashboardData = async (): Promise<any> => {
  try {
    // In a real implementation:
    // const response = await axios.get('/api/dashboard/stats');
    // return response.data;
    
    // Simulated response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    
    return {
      totalDetections: 2583,
      realFaces: 2312,
      spoofAttempts: 271,
      attackTypes: {
        print: 112,
        digital: 89,
        mask: 47,
        deepfake: 23
      },
      metrics: {
        accuracy: 96.8,
        falsePositive: 1.2,
        falseNegative: 2.8,
        processingTime: 412
      },
      trendsData: {
        weekly: [
          { date: '2025-01-01', real: 150, spoof: 12 },
          { date: '2025-01-08', real: 165, spoof: 15 },
          { date: '2025-01-15', real: 172, spoof: 18 },
          { date: '2025-01-22', real: 180, spoof: 14 },
          { date: '2025-01-29', real: 195, spoof: 24 },
          { date: '2025-02-05', real: 205, spoof: 20 },
          { date: '2025-02-12', real: 220, spoof: 17 }
        ],
        attackDistribution: [
          { type: 'Print', value: 41 },
          { type: 'Digital Screen', value: 33 },
          { type: 'Mask', value: 17 },
          { type: 'Deepfake', value: 9 }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};

export const getDetectionHistory = async (limit: number = 10): Promise<any> => {
  try {
    // In a real implementation:
    // const response = await axios.get(`/api/detections/history?limit=${limit}`);
    // return response.data;
    
    // Simulated response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const results = [];
    for (let i = 0; i < limit; i++) {
      const isReal = Math.random() > 0.3;
      const timestamp = new Date(Date.now() - i * 3600000).toISOString();
      
      results.push({
        id: `det-${i + 1000}`,
        timestamp,
        isReal,
        confidence: isReal ? 0.7 + (Math.random() * 0.28) : 0.65 + (Math.random() * 0.3),
        attackType: isReal ? null : ['Print', 'Digital', 'Mask', 'Deepfake'][Math.floor(Math.random() * 4)]
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error fetching detection history:', error);
    throw new Error('Failed to fetch detection history');
  }
};