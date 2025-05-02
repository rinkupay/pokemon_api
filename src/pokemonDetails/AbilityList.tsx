// components/PokemonDetails/AbilityList.tsx
import React from "react";

const AbilityList: React.FC<{ abilities: any[] }> = ({ abilities }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold mb-2">Abilities</h2>
    <ul className="list-disc list-inside">
      {abilities.map((a, i) => (
        <li key={i}>{a.ability.name}</li>
      ))}
    </ul>
  </div>
);

export default AbilityList;
