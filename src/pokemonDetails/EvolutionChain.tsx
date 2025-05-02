// components/PokemonDetails/EvolutionChain.tsx
import React, { useEffect, useState } from "react";

const EvolutionChain: React.FC<{ speciesUrl: string }> = ({ speciesUrl }) => {
  const [chain, setChain] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const speciesRes = await fetch(speciesUrl);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const names: string[] = [];
        let current = evoData.chain;

        while (current) {
          names.push(current.species.name);
          current = current.evolves_to[0];
        }

        setChain(names);
      } catch (error) {
        console.error("Failed to load evolution chain");
      }
    };

    fetchEvolutionChain();
  }, [speciesUrl]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Evolution Chain</h2>
      <div className="flex gap-2 items-center flex-wrap">
        {chain.map((name, i) => (
          <span key={i} className="px-2 py-1 bg-blue-100 rounded">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
