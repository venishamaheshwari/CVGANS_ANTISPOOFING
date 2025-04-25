import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, LineChart, BarChart, PieChartIcon, BarChart3, LineChart as LineChartIcon, FileQuestion } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RechartsBarChart, Bar } from 'recharts';
import { getDashboardData } from '../services/dashboardService';
import MetricCard from '../components/dashboard/MetricCard';
import LoadingIndicator from '../components/ui/LoadingIndicator';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        console.error('Dashboard data error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[500px]">
        <LoadingIndicator size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-error-50 p-6 rounded-lg border border-error-200 text-center">
          <FileQuestion className="w-16 h-16 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-error-800 mb-2">Failed to Load Dashboard</h2>
          <p className="text-error-700 mb-6">{error}</p>
          <button 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Mock data for dashboard demonstration
  const pieData = [
    { name: 'Real Faces', value: 65 },
    { name: 'Print Attacks', value: 15 },
    { name: 'Digital Screen', value: 12 },
    { name: 'Mask Attacks', value: 8 },
  ];
  
  const lineData = [
    { name: 'Jan', real: 40, spoof: 24 },
    { name: 'Feb', real: 30, spoof: 13 },
    { name: 'Mar', real: 45, spoof: 26 },
    { name: 'Apr', real: 50, spoof: 15 },
    { name: 'May', real: 65, spoof: 21 },
    { name: 'Jun', real: 60, spoof: 28 },
    { name: 'Jul', real: 80, spoof: 31 },
  ];
  
  const barData = [
    { name: 'Print', success: 85, failure: 15 },
    { name: 'Digital', success: 90, failure: 10 },
    { name: 'Mask', success: 70, failure: 30 },
    { name: 'Deepfake', success: 75, failure: 25 },
  ];

  const COLORS = ['#4338ca', '#ef4444', '#0ea5e9', '#f59e0b'];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Detection Dashboard</h1>
        <p className="text-lg text-surface-700 mb-8">
          Comprehensive analytics and insights from your face spoofing detection system.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Detection Accuracy" 
          value="96.8%" 
          change="+2.4%" 
          positive={true}
          icon={<PieChartIcon className="w-6 h-6" />}
          color="primary"
        />
        <MetricCard 
          title="Spoofing Attempts" 
          value="143" 
          change="+12%" 
          positive={false}
          icon={<BarChart3 className="w-6 h-6" />}
          color="accent"
        />
        <MetricCard 
          title="Processing Time" 
          value="412ms" 
          change="-23ms" 
          positive={true}
          icon={<LineChartIcon className="w-6 h-6" />}
          color="success"
        />
        <MetricCard 
          title="False Positives" 
          value="1.2%" 
          change="-0.3%" 
          positive={true}
          icon={<PieChartIcon className="w-6 h-6" />}
          color="secondary"
        />
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-surface-200">
            <nav className="flex">
              <button
                className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                  activeTab === 'overview' 
                    ? 'border-b-2 border-primary-600 text-primary-600' 
                    : 'text-surface-600 hover:text-surface-900'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-primary-600 text-primary-600' 
                    : 'text-surface-600 hover:text-surface-900'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Detection Details
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                  activeTab === 'trends' 
                    ? 'border-b-2 border-primary-600 text-primary-600' 
                    : 'text-surface-600 hover:text-surface-900'
                }`}
                onClick={() => setActiveTab('trends')}
              >
                Trends
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-surface-900 mb-6">Detection Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Detection Distribution</h4>
                    <div className="bg-surface-50 p-4 rounded-lg h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            innerRadius={70}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Detection Metrics Over Time</h4>
                    <div className="bg-surface-50 p-4 rounded-lg h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={lineData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="real" stroke="#4338ca" activeDot={{ r: 8 }} name="Real Faces" />
                          <Line type="monotone" dataKey="spoof" stroke="#ef4444" name="Spoof Attempts" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div>
                <h3 className="text-xl font-semibold text-surface-900 mb-6">Detection Details</h3>
                <div className="bg-surface-50 p-4 rounded-lg h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="success" fill="#22c55e" name="Detection Success %" />
                      <Bar dataKey="failure" fill="#ef4444" name="Detection Failure %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Detection Success by Type</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-surface-700">Print Attack Detection</span>
                          <span className="text-sm font-medium text-surface-700">85%</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div className="bg-success-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-surface-700">Digital Screen Detection</span>
                          <span className="text-sm font-medium text-surface-700">90%</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div className="bg-success-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-surface-700">Mask Attack Detection</span>
                          <span className="text-sm font-medium text-surface-700">70%</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div className="bg-success-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-surface-700">Deepfake Detection</span>
                          <span className="text-sm font-medium text-surface-700">75%</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div className="bg-success-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-surface-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Model Performance</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-surface-700">Average Inference Time</span>
                        <span className="text-sm font-medium text-primary-600">412 ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-surface-700">False Positive Rate</span>
                        <span className="text-sm font-medium text-primary-600">1.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-surface-700">False Negative Rate</span>
                        <span className="text-sm font-medium text-primary-600">2.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-surface-700">Model Accuracy</span>
                        <span className="text-sm font-medium text-primary-600">96.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-surface-700">F1 Score</span>
                        <span className="text-sm font-medium text-primary-600">0.975</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'trends' && (
              <div>
                <h3 className="text-xl font-semibold text-surface-900 mb-6">Detection Trends</h3>
                <p className="text-surface-700 mb-6">
                  Track how detection performance and attack types have changed over time.
                </p>
                
                <div className="bg-surface-50 p-4 rounded-lg h-80 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="real" stroke="#4338ca" activeDot={{ r: 8 }} name="Real Faces" />
                      <Line type="monotone" dataKey="spoof" stroke="#ef4444" name="Spoof Attempts" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Attack Trends</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-error-500 mr-3"></div>
                        <span className="text-surface-700">Print attacks decreasing (-12%)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-warning-500 mr-3"></div>
                        <span className="text-surface-700">Digital screen attacks stable</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-error-600 mr-3"></div>
                        <span className="text-surface-700">3D mask attacks increasing (+8%)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-error-700 mr-3"></div>
                        <span className="text-surface-700">Deepfakes increasing (+15%)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-surface-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Model Performance</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-success-500 mr-3"></div>
                        <span className="text-surface-700">Accuracy improving (+2.4%)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-success-500 mr-3"></div>
                        <span className="text-surface-700">Inference time decreasing (-23ms)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-success-600 mr-3"></div>
                        <span className="text-surface-700">False positives decreasing (-0.3%)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-surface-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-surface-800 mb-4">Recommendations</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-primary-500 mt-1.5 mr-3"></div>
                        <span className="text-surface-700">Update model to improve 3D mask detection</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-primary-500 mt-1.5 mr-3"></div>
                        <span className="text-surface-700">Increase deepfake detection training data</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-3 h-3 rounded-full bg-primary-600 mt-1.5 mr-3"></div>
                        <span className="text-surface-700">Consider multi-modal detection approach</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;