import React from 'react';

interface GradCAMVisualizationProps {
  gradCamData: any;
  originalImage: string;
}

const GradCAMVisualization: React.FC<GradCAMVisualizationProps> = ({ gradCamData, originalImage }) => {
  // In a real implementation, we would use the gradCamData to generate a heatmap overlay
  // Here we're simulating it with a placeholder
  
  return (
    <div className="bg-surface-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Model Attention Visualization</h3>
      <p className="text-surface-300 mb-4">
        This heatmap shows which regions of the image the model focused on to make its decision.
        Red areas indicate regions of high importance to the detection algorithm.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-surface-400 mb-2">Original Image</p>
          <div className="rounded-lg overflow-hidden">
            <img src={originalImage} alt="Original face image" className="w-full h-auto" />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-surface-400 mb-2">Attention Heatmap</p>
          <div className="rounded-lg overflow-hidden relative">
            {/* This would be a real heatmap in production. Here we're using a placeholder overlay */}
            <img src={originalImage} alt="Heatmap visualization" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-br from-error-500/40 to-warning-500/30 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-surface-900/70 px-3 py-1 rounded text-sm text-white">
                Simulated heatmap (placeholder)
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-white mb-2">Key Findings</h4>
        <ul className="text-sm text-surface-300 space-y-1 list-disc pl-5">
          <li>High attention on facial texture patterns</li>
          <li>Focus on eye regions for blink detection</li>
          <li>Attention to skin reflectance properties</li>
          <li>Analysis of micro-texture patterns</li>
        </ul>
      </div>
    </div>
  );
};

export default GradCAMVisualization;