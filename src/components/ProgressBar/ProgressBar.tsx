import React from "react";
import "./ProgressBar.css";

interface Step {
  label: string;
  icon: string;
  completed: boolean;
  current: boolean;
}

interface ProgressBarProps {
  steps: Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  return (
    <div className="progress-bar">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div
              className={`progress-step ${step.completed ? "completed" : ""} ${
                step.current ? "current" : ""
              }`}
            >
              <div className="step-circle">
                <span className="step-icon">{step.icon}</span>
              </div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`progress-line ${step.completed ? "completed" : ""}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
