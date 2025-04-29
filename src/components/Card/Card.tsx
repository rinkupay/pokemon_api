import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[]; // Array because Pokémon can have multiple types
}

const Card: React.FC<PokemonCardProps> = ({ id, name, image, types }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 border border-gray-200 transform transition hover:shadow-lg hover:border-blue-200 hover:cursor-pointer">
      
      {/* Pokémon Image */}
      <img src={image} alt={name} className="w-full h-40 object-contain rounded-md" />

      {/* Pokémon Details */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold capitalize">{name}</h3>
        <p className="text-gray-500 text-sm mb-2">ID: #{id}</p>

        {/* Pokémon Types */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 capitalize"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
