// pages/FavoriteList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

const FavoriteList: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favIds);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) return;

      setLoading(true);
      try {
        const promises = favorites.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(promises);
        setPokemonList(results);
      } catch (error) {
        toast.error("Failed to fetch favorite Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Favorite Pokémon</h1>

      {pokemonList.length === 0 ? (
        <p className="text-gray-500 text-center">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pokemonList.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24 mx-auto object-contain"
              />
              <h2 className="mt-2 text-center font-semibold capitalize text-gray-700">
                {pokemon.name}
              </h2>
              <p className="text-center text-sm text-gray-500">ID: {pokemon.id}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
