import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Type Definitions
interface Ability {
  ability: {
    name: string;
  };
}

interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

interface Cry {
  latest: string;
  legacy: string;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
  sprites: Sprites;
  types: { name: string }[] | string[]; // Adjusted to handle both cases
  abilities: Ability[];
  base_experience: number;
  height: number;
  weight: number;
  cries: Cry;
}

const ComparePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPokemons }: { selectedPokemons: Pokemon[] } = location.state || { selectedPokemons: [] };

  

  if (!selectedPokemons || selectedPokemons.length !== 2) {
    return (
      <div className="text-center mt-10 text-lg text-gray-700">
        <p>You need to select exactly 2 Pokémon to compare.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Compare Pokémon</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {selectedPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src={pokemon.sprites?.front_default}
                alt={pokemon.name}
                className="w-32 h-32 object-contain"
              />
              <h3 className="text-xl font-semibold capitalize">{pokemon.name}</h3>
              <p className="text-gray-600">ID: #{pokemon.id}</p>
              <div className="text-sm">
                <p><strong>Base XP:</strong> {pokemon.base_experience}</p>
                <p><strong>Height:</strong> {pokemon.height}</p>
                <p><strong>Weight:</strong> {pokemon.weight}</p>
              </div>
              <div>
                <p className="font-medium">Types:</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((typeObj: any) => typeObj.type.name).map((type: string) => (
                    <span
                      key={type}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium">Abilities:</p>
                <p className="text-sm text-gray-700">
                  {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </p>
              </div>
              <audio controls src={pokemon.cries.latest} className="mt-2" />

              <div className="mt-4">
                <h4 className="text-lg font-medium">Sprites</h4>
                <div className="flex gap-4">
                  <div>
                    <p>Front:</p>
                    <img
                      src={pokemon.sprites.front_shiny || pokemon.sprites.front_default}
                      alt="Front Sprite"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <p>Back:</p>
                    <img
                      src={pokemon.sprites.back_shiny || pokemon.sprites.back_default}
                      alt="Back Sprite"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Go to List Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")} // Adjust the path as per your app's routes
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Go to Pokémon List
        </button>
      </div>
    </div>
  );
};

export default ComparePage;
