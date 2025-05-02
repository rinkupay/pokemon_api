// components/PokemonDetails/MoveList.tsx
import React from "react";

const MoveList: React.FC<{ moves: any[] }> = ({ moves }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold mb-2">Moves (First 10)</h2>
    <ul className="list-disc list-inside">
      {moves.map((move, index) => (
        <li key={index}>{move.move.name}</li>
      ))}
    </ul>
  </div>
);

export default MoveList;
