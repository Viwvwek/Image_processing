import React from 'react';
import './ProcessingOptions.css';

const optionsConfig = [
  { id: 'grayscale', label: 'Grayscale' },
  { id: 'edges', label: 'Edge Detection' },
  { id: 'threshold', label: 'Threshold' },
  { id: 'sepia', label: 'Sepia Effect' },
  { id: 'saturate', label: 'Saturation' },
  { id: 'pil_contrast', label: 'Contrast Enhancement' },
];

const ProcessingOptions = ({ options, onOptionsChange }) => {
  const handleOptionToggle = (optionId) => {
    onOptionsChange({
      ...options,
      [optionId]: !options[optionId],
    });
  };

  return (
    <div className="processing-options">
      <h2>Processing Options</h2>
      <div className="options-grid">
        {optionsConfig.map((option) => (
          <div key={option.id} className="option-item">
            <input
              type="checkbox"
              id={option.id}
              checked={options[option.id]}
              onChange={() => handleOptionToggle(option.id)}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingOptions;