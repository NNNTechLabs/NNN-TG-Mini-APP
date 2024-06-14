import React, { useEffect, useState, useMemo } from "react";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  duration: number;
  showName: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 100,
  strokeWidth = 10,
  duration = 10,
  showName = false,
}) => {
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const increment = (elapsed / (duration * 1000)) * 100;
      setProgress(increment > 100 ? 100 : increment);
      if (increment < 100) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [duration]);

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      {showName && (
        <div className="raffle-name-wrapper">
          <span>D-2</span>
          <span>13:08:02</span>
        </div>
      )}
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="circular-progress__circle circular-progress__background"
          style={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="circular-progress__circle circular-progress__progress"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }}
        />
      </svg>
    </div>
  );
};

export default CircularProgress;
