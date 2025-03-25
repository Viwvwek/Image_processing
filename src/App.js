import React, { useState, useEffect } from 'react';
import { processImage, checkServerStatus } from './api/imageService';
import ImageUploader from './components/ImageUploader/ImageUploader';
import ProcessingOptions from './components/ProcessingOptions/ProcessingOptions';
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay';
import './App.css';

const initialOptions = {
  grayscale: false,
  edges: false,
  threshold: false,
  sepia: false,
  saturate: false,
  pil_contrast: false,
};

function App() {
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(initialOptions);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      const isOnline = await checkServerStatus();
      setServerOnline(isOnline);
    };
    checkServer();
  }, []);

  const handleProcess = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    if (!Object.values(options).some(opt => opt)) {
      setError('Please select at least one processing option');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const processedResults = await processImage(image, options);
      setResults(processedResults);
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Image Processing App</h1>
        <div className={`server-status ${serverOnline ? 'online' : 'offline'}`}>
          {serverOnline ? 'Server Online' : 'Server Offline'}
        </div>
      </header>

      <main className="main-content">
        {!serverOnline ? (
          <div className="server-warning">
            <p>The image processing server is currently offline. Please ensure the backend is running.</p>
          </div>
        ) : (
          <>
            <ImageUploader onImageSelect={setImage} />
            <ProcessingOptions options={options} onOptionsChange={setOptions} />
            
            <button
              className="process-button"
              onClick={handleProcess}
              disabled={!image || isLoading}
            >
              {isLoading ? 'Processing...' : 'Process Image'}
            </button>
            
            <ResultsDisplay results={results} isLoading={isLoading} error={error} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;