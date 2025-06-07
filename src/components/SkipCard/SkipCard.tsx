import React from "react";
import { SkipCardProps } from "../../types";
import "./SkipCard.css";

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const totalPrice = Math.round(skip.price_before_vat * (1 + skip.vat / 100));

  return (
    <div
      className={`skip-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(skip)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(skip);
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="skip-image-container">
        <div className="skip-image">
          <div className={`skip-illustration skip-${skip.size}y`}>
            <div className="skip-body"></div>
            <div className="skip-handles"></div>
            {skip.size >= 20 && <div className="skip-reinforcement"></div>}
          </div>
        </div>
        <div className="skip-size-badge">{skip.size} Yards</div>
      </div>

      <div className="skip-content">
        <h3 className="skip-title">{skip.size} Yard Skip</h3>
        <p className="skip-duration">{skip.hire_period_days} day hire period</p>

        <div className="skip-features">
          {skip.allowed_on_road && (
            <span className="feature-badge road">Road Placement</span>
          )}
          {!skip.allowed_on_road && (
            <span className="feature-badge not-allowed">
              ⚠️ Not Allowed On The Road
            </span>
          )}
          {skip.allows_heavy_waste && (
            <span className="feature-badge heavy">Heavy Waste OK</span>
          )}
        </div>

        <div className="skip-price">
          £{totalPrice}
          <span className="price-note">inc. VAT</span>
        </div>

        <button
          className={`select-button ${isSelected ? "selected" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skip);
          }}
        >
          {isSelected ? "Selected ✓" : "Select This Skip →"}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
