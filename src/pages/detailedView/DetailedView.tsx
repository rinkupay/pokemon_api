import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatBar from "@/pokemonDetails/StatBar";
import AbilityList from "@/pokemonDetails/AbilityList";
import MoveList from "@/pokemonDetails/MoveList";
import EvolutionChain from "@/pokemonDetails/EvolutionChain";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";
import { Heart, HeartOff } from "lucide-react";

const DetailedView: React.FC = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        toast.error("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(pokemon.id));
    }
  }, [pokemon]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((favId: number) => favId !== pokemon.id);
      toast.success(`${pokemon.name} removed from favorites`);
    } else {
      updatedFavorites = [...favorites, pokemon.id];
      toast.success(`${pokemon.name} added to favorites`);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading || !pokemon) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-2xl mt-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 object-contain bg-gray-100 rounded-xl shadow"
        />

        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold capitalize text-gray-800 mb-2">
            {pokemon.name}
          </h1>
          <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
          <p className="text-sm text-gray-500">Height: {pokemon.height / 10} m</p>
          <p className="text-sm text-gray-500">Weight: {pokemon.weight / 10} kg</p>
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 sm:top-0 sm:right-0 p-2 rounded-full ${
            isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
          } hover:scale-110 transition`}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? <Heart className="fill-red-500" /> : <HeartOff />}
        </button>
      </div>

      <div className="mt-8 space-y-6">
        <StatBar stats={pokemon.stats} />
        <AbilityList abilities={pokemon.abilities} />
        <MoveList moves={pokemon.moves.slice(0, 10)} />
        <EvolutionChain speciesUrl={pokemon.species.url} />
      </div>
    </div>
  );
};

export default DetailedView;
