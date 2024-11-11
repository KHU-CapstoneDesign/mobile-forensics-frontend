import React from 'react';
import styled from 'styled-components';

const CircularProgressBar = ({ size, strokeWidth, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <Circle
        stroke="#2c2c2c"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <Text x="50%" y="50%" dy=".3em" textAnchor="middle">
        {`${progress}%`}
      </Text>{' '}
    </Svg>
  );
};

export default CircularProgressBar;

const Svg = styled.svg`
  transform: rotate(-90deg);
`;

const Circle = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(0deg);
  transform-origin: 50% 50%;
`;

const Text = styled.text`
  font-size: 25px;
  fill: #2c2c2c;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
`;
