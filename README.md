<<<<<<< HEAD
# CVGANS_ANTISPOOFING
=======
# Face Spoofing Detection System

An advanced face spoofing detection system built with React and FastAPI. This system uses state-of-the-art deep learning models to detect various types of presentation attacks in real-time.

## Features

- Real-time face spoofing detection using webcam
- Powerful ML pipeline with multi-model architecture
- Comprehensive preprocessing with face detection and normalization
- Visualization tools for model predictions and explainability
- FastAPI backend for model serving and inference
- Beautiful and responsive frontend with intuitive UI
- Detailed analytics dashboard for monitoring detection performance

## Tech Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Recharts for data visualization
- React Router for navigation

### Backend
- FastAPI (Python)
- ML models for face detection and anti-spoofing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/face-spoofing-detection.git
cd face-spoofing-detection
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Running the Application

1. Start the frontend development server
```bash
npm run dev
```

2. Start the backend API server (in a different terminal)
```bash
npm run start-api
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/                # Static assets
├── src/                   # Frontend source code
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   └── ...
├── backend/               # Python backend
│   ├── app.py             # FastAPI application
│   └── ...
└── ...
```

## Future Enhancements

- Integration with more sophisticated ML models
- Support for video-based liveness detection
- Multi-factor authentication integration
- Mobile app support
- Cloud deployment options

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

This project is based on the research repo by [RiyaGupta122](https://github.com/RiyaGupta122/Face_spoofing).
>>>>>>> 0bf264f (Initial commit)
