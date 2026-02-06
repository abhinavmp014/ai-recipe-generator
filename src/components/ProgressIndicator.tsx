/**
 * Progress Indicator Component
 * Shows current step in multi-page flow
 */

import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="progress-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`progress-step ${
            index === currentStep
              ? 'active'
              : index < currentStep
              ? 'completed'
              : ''
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
