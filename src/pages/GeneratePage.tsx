/**
 * Generate Recipe Page
 * Shows loading state while AI generates recipe
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PageTransition from '../components/PageTransition';
import { useRecipe } from '../context/RecipeContext';
import { generateRecipe } from '../services/openRouterApi';
import { saveLastRecipe } from '../utils/storage';

const GeneratePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useRecipe();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Generate recipe on mount
    const generate = async () => {
      actions.setLoadingState('loading');
      setError(null);

      try {
        const result = await generateRecipe({
          ingredients: state.ingredients,
          dietType: state.dietType,
          caloriePreference: state.caloriePreference,
          customCalories: state.customCalories,
          servingSize: state.servingSize,
        });

        if (result.success && result.data) {
          actions.setCurrentRecipe(result.data);
          saveLastRecipe(result.data);
          actions.setLoadingState('success');
          navigate('/result', { replace: true });
        } else {
          setError(result.error || 'Failed to generate recipe');
          actions.setLoadingState('error');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        actions.setLoadingState('error');
      }
    };

    generate();
  }, []);

  // Handle retry
  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  // Handle go back
  const handleGoBack = () => {
    navigate('/ingredients');
  };

  // Error state
  if (error) {
    return (
      <PageTransition>
        <div className="page">
          <div className="error-container">
            <div className="error-icon animate-bounceIn">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="error-title animate-fadeInUp stagger-1">
              Oops! Something went wrong
            </h2>
            <p className="error-message animate-fadeInUp stagger-2">
              {error}
            </p>
            <div className="error-actions animate-fadeInUp stagger-3">
              <button className="btn btn-primary" onClick={handleRetry}>
                <i className="fas fa-redo"></i>
                Try Again
              </button>
              <button className="btn btn-secondary" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Loading state
  return (
    <PageTransition>
      <div className="page generate-page">
        <div className="generate-content">
          <LoadingSpinner
            text="Creating your recipe..."
            subText="Our AI chef is analyzing your ingredients"
            showTips={true}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default GeneratePage;
