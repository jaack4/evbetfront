"use client";

import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  size: string;
}

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const count = 50;
    const newSnowflakes: Snowflake[] = [];

    for (let i = 0; i < count; i++) {
      newSnowflakes.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 5}s`, // Slower fall: 5-10s
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.3 + 0.1, // Subtle opacity
        size: `${Math.random() * 3 + 2}px`,
      });
    }

    setSnowflakes(newSnowflakes);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake bg-white rounded-full absolute -top-2"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};
