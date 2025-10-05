import React, { useMemo } from 'react';

interface DottedBackgroundProps {
  // Style props
  dotColor?: string;
  backgroundColor?: string;
  dotSize?: number;
  dotSpacing?: number;

  // Effects props
  enableVignette?: boolean;
  vignetteColor?: string;
  enableInnerGlow?: boolean;
  innerGlowColor?: string;

  // Animation props
  animationType?: 'pulse' | 'wave' | 'ripple' | 'breathe' | 'spiral';
  animationSpeed?: number;
  enableFloatingDots?: boolean;

  // Container props
  className?: string;
  style?: React.CSSProperties;
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({
  dotColor = '#a855f7',
  backgroundColor = 'transparent',
  dotSize = 2,
  dotSpacing = 20,
  enableVignette = true,
  vignetteColor = 'rgb(0,0,0)',
  enableInnerGlow = true,
  innerGlowColor = 'rgb(168,85,247)',
  animationType = 'pulse',
  animationSpeed = 2,
  enableFloatingDots = true,
  className = '',
  style = {},
}) => {
  const ids = useMemo(() => {
    const baseId = `dotted-bg-${Math.random().toString(36).substr(2, 9)}`;
    return {
      pattern: `${baseId}-pattern`,
      vignette: `${baseId}-vignette`,
      innerGlow: `${baseId}-inner-glow`,
      animatedPattern: `${baseId}-animated-pattern`,
    };
  }, []);

  const getAnimationKeyframes = () => {
    switch (animationType) {
      case 'wave':
        return `
          @keyframes wave-${ids.pattern} {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
            25% { transform: scale(1.5) rotate(90deg); opacity: 1; }
            50% { transform: scale(0.8) rotate(180deg); opacity: 0.6; }
            75% { transform: scale(1.2) rotate(270deg); opacity: 0.9; }
          }
        `;
      case 'ripple':
        return `
          @keyframes ripple-${ids.pattern} {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
        `;
      case 'breathe':
        return `
          @keyframes breathe-${ids.pattern} {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
          }
        `;
      case 'spiral':
        return `
          @keyframes spiral-${ids.pattern} {
            0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
            100% { transform: scale(1.1) rotate(360deg); opacity: 0.8; }
          }
        `;
      default: // pulse
        return `
          @keyframes pulse-${ids.pattern} {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.4); opacity: 1; }
          }
        `;
    }
  };

  const getFloatingDotsKeyframes = () => `
    @keyframes float-1 {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
      33% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
      66% { transform: translateY(10px) translateX(-15px); opacity: 0.5; }
    }
    @keyframes float-2 {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
      25% { transform: translateY(15px) translateX(-20px); opacity: 0.9; }
      75% { transform: translateY(-10px) translateX(25px); opacity: 0.6; }
    }
    @keyframes float-3 {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
      40% { transform: translateY(-25px) translateX(-10px); opacity: 0.7; }
      80% { transform: translateY(20px) translateX(15px); opacity: 0.8; }
    }
  `;

  const getGlowAnimation = () => `
    @keyframes glow-${ids.innerGlow} {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
  `;

  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`} style={style}>
      <style>
        {`
          ${getAnimationKeyframes()}
          ${enableFloatingDots ? getFloatingDotsKeyframes() : ''}
          ${enableInnerGlow ? getGlowAnimation() : ''}
          
          .dot-animation {
            animation: ${animationType}-${ids.pattern} ${animationSpeed}s ease-in-out infinite;
            transform-origin: center;
          }
          
          .floating-dot {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
          }
          
          .floating-dot-1 {
            animation: float-1 4s ease-in-out infinite;
            top: 20%;
            left: 30%;
            width: 4px;
            height: 4px;
            background: ${dotColor};
          }
          
          .floating-dot-2 {
            animation: float-2 5s ease-in-out infinite 1s;
            top: 60%;
            right: 25%;
            width: 6px;
            height: 6px;
            background: ${dotColor};
          }
          
          .floating-dot-3 {
            animation: float-3 3.5s ease-in-out infinite 0.5s;
            bottom: 30%;
            left: 60%;
            width: 3px;
            height: 3px;
            background: ${dotColor};
          }
          
          .glow-animation {
            animation: glow-${ids.innerGlow} ${animationSpeed * 2.5}s ease-in-out infinite;
          }
        `}
      </style>
      
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          {/* Animated Pattern */}
          <pattern
            id={ids.pattern}
            x="0"
            y="0"
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle 
              cx={dotSpacing / 2} 
              cy={dotSpacing / 2} 
              r={dotSize} 
              fill={dotColor}
              className="dot-animation"
            />
          </pattern>

          {/* Vignette Gradient */}
          {enableVignette && (
            <radialGradient
              id={ids.vignette}
              cx="50%"
              cy="50%"
              r="70%"
              fx="50%"
              fy="50%"
            >
              <stop offset="30%" stopColor={vignetteColor} stopOpacity="0">
                <animate attributeName="stop-opacity" values="0;0.1;0" dur={`${animationSpeed * 2}s`} repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={vignetteColor} stopOpacity="0.8">
                <animate attributeName="stop-opacity" values="0.8;0.9;0.8" dur={`${animationSpeed * 2}s`} repeatCount="indefinite" />
              </stop>
            </radialGradient>
          )}

          {/* Enhanced Inner Glow Gradient */}
          {enableInnerGlow && (
            <radialGradient
              id={ids.innerGlow}
              cx="50%"
              cy="50%"
              r="40%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor={innerGlowColor} stopOpacity="0.8" />
              <stop offset="70%" stopColor={innerGlowColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={innerGlowColor} stopOpacity="0" />
            </radialGradient>
          )}
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="100%" height="100%" fill={backgroundColor} />
        
        {/* Animated Dotted Pattern */}
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${ids.pattern})`} />

        {/* Animated Vignette */}
        {enableVignette && (
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${ids.vignette})`} />
        )}

        {/* Animated Inner Glow */}
        {enableInnerGlow && (
          <circle 
            cx="50%" 
            cy="50%" 
            r="35%" 
            fill={`url(#${ids.innerGlow})`}
            className="glow-animation"
          />
        )}
      </svg>

      {/* Floating Dots */}
      {enableFloatingDots && (
        <>
          <div className="floating-dot floating-dot-1" />
          <div className="floating-dot floating-dot-2" />
          <div className="floating-dot floating-dot-3" />
        </>
      )}
    </div>
  );
};

export default DottedBackground;