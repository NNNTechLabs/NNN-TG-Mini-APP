import React from "react";

interface EnergyProgressProps {
  value: number;
  maxValue: number;
}

const EnergyProgress: React.FC<EnergyProgressProps> = ({ value, maxValue }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = Math.PI * radius;
  const percentage = (value / maxValue) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-container">
      <svg
        className="progress-ring"
        width="140"
        height="60"
        viewBox="0 0 120 60"
      >
        <path
          className="progress-ring__background"
          d={`M 10, ${radius + strokeWidth / 2} a ${radius},${radius} 0 1,1 ${
            radius * 2
          },0`}
          stroke="grey"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <path
          className="progress-ring__progress"
          d={`M 10, ${radius + strokeWidth / 2} a ${radius},${radius} 0 1,1 ${
            radius * 2
          },0`}
          stroke="#74F9D4"
          strokeWidth={strokeWidth}
          fill="transparent"
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
      </svg>
      <div className="progress-text">
        {value}/{maxValue}
      </div>
    </div>
  );
};

export default EnergyProgress;
