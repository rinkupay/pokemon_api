// components/PokemonDetails/StatBar.tsx
import React from "react";

const StatBar: React.FC<{ stats: any[] }> = ({ stats }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Stats</h2>
      {stats.map((stat, index) => (
        <div key={index} className="mb-1">
          <div className="flex justify-between text-sm">
            <span>{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-500 rounded"
              style={{ width: `${stat.base_stat / 2}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatBar;
