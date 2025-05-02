import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdCompareArrows } from "react-icons/md";


interface Ability {
  ability: {
    name: string;
  };
}

interface Cry {
  latest: string;
  legacy: string;
}

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: Ability[];
  base_experience: number;
  height: number;
  weight: number;
  cries: Cry;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const ListView: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  types,
  abilities,
  base_experience,
  height,
  weight,
  cries,
  isSelected,
  onToggleSelect,
}) => {

  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

 

  const playCry = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleCardClick = () => {
    navigate(`/pokemon/${id}`);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelect(id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`w-full bg-white shadow-md rounded-lg p-4 border ${
        isSelected ? "border-blue-400 ring-2 ring-blue-300" : "border-gray-200"
      } flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:shadow-lg hover:border-blue-200 hover:cursor-pointer transition-transform`}
    >
      <div className="w-full relative flex items-start sm:items-center gap-2">
        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-28 h-28 object-contain rounded-md flex-shrink-0"
        />

        {/* Details */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-between w-full gap-4 text-sm">
          <div>
            <h3 className="text-xl font-bold capitalize">{name}</h3>
            <p className="text-gray-500">ID: #{id}</p>
          </div>

          <div>
            <h5 className="text-gray-500 font-medium">Types</h5>
            <div className="flex flex-wrap gap-2 mt-1">
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

          <div>
            <h5 className="text-gray-500 font-medium">Abilities</h5>
            <p className="mt-1 text-gray-700">
              {abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>Base XP:</strong> {base_experience}
            </p>
            <p>
              <strong>Height:</strong> {height}
            </p>
            <p>
              <strong>Weight:</strong> {weight}
            </p>
          </div>

          <div>
            <button
              onClick={playCry}
              className="px-4 py-2 text-sm mt-8 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
            >
              🔊 Play Cry
            </button>
            <audio  ref={audioRef} src={cries.latest} preload="auto" />
          </div>
        </div>

        {/* Compare Button */}
        <div className="absolute top-0 right-0">
          <button
            onClick={handleCompareClick}
            className={`flex items-center gap-1.5 px-2 py-1 text-sm rounded cursor-pointer ${
              isSelected
                ? "bg-red-500 hover:bg-red-600"
                : "bg-sky-500 hover:bg-sky-600"
            } text-white transition`}
          >
            <span >{isSelected ? "Remove" : "Add to compare"}</span>
            <MdCompareArrows size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListView;
