import React, { useState, useEffect } from "react";
import { Skip } from "../../types";
import SkipCard from "../SkipCard/SkipCard";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./SkipSelector.css";

const SkipSelector: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const progressSteps = [
    { label: "Postcode", icon: "📍", completed: true, current: false },
    { label: "Waste Type", icon: "🗑️", completed: true, current: false },
    { label: "Select Skip", icon: "🚛", completed: false, current: true },
    { label: "Permit Check", icon: "✓", completed: false, current: false },
    { label: "Choose Date", icon: "📅", completed: false, current: false },
    { label: "Payment", icon: "💳", completed: false, current: false },
  ];

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Skip[] = await response.json();
        setSkips(data.sort((a, b) => a.size - b.size));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch skip data"
        );
        console.error("Error fetching skips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      // In a real app, this would navigate to the next step
      alert(
        `Selected ${selectedSkip.size} Yard Skip for £${Math.round(
          selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)
        )}. Proceeding to permit check...`
      );
    }
  };

  const handleBack = () => {
    // In a real app, this would navigate back to the previous step
    alert("Going back to waste type selection...");
  };

  if (loading) {
    return (
      <div className="skip-selector">
        <div className="container">
          <div className="loading-state">
            <div
              className="loading-spinner"
              data-testid="loading-spinner"
            ></div>
            <p>Loading skip options...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="skip-selector">
        <div className="container">
          <div className="error-state">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skip-selector">
      <ProgressBar steps={progressSteps} />

      <div className="container">
        <div className="header">
          <h1>Choose Your Skip Size</h1>
          <p>Select the skip size that best suits your needs</p>
        </div>

        <div className="skips-grid">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={handleSkipSelect}
            />
          ))}
        </div>

        <div className="action-bar">
          {selectedSkip && (
            <div className="selection-summary">
              <strong>{selectedSkip.size} Yard Skip</strong> £
              {Math.round(
                selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)
              )}
              <span className="hire-period">
                {selectedSkip.hire_period_days} day hire
              </span>
            </div>
          )}

          <div className="action-buttons">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button
              className="continue-button"
              onClick={handleContinue}
              disabled={!selectedSkip}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipSelector;
