import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Processing your image...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!results) {
    return null;
  }

  return (
    <div className="results-display">
      <h2>Processing Results</h2>
      <div className="results-grid">
        {Object.entries(results).map(([name, imageData]) => (
          <div key={name} className="result-item">
            <h3>{name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
            <img 
              src={`data:image/jpeg;base64,${imageData}`} 
              alt={name}
              className="processed-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;