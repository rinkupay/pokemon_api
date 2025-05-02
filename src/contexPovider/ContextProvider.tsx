import React, { createContext, useState, useEffect, useContext,ReactNode } from "react";
import toast from "react-hot-toast";

interface PokemonContextType {
  data: any[];
  loading: boolean;
  fetchPokemons: () => void;
}
interface PokemonProviderProps {
  children: ReactNode;
}
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
      if (!response.ok) throw new Error("Failed to fetch Pokémon list");
  
      const data = await response.json();
      const urls = data.results.map((pokemon: any) => pokemon.url);
  
      // Batch helper
      const batchSize = 10;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      const results: any[] = [];
  
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(
          batch.map(async (url:any) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            return await res.json();
          })
        );
  
        // Push successful results
        batchResults.forEach((result) => {
          if (result.status === "fulfilled") {
            results.push(result.value);
          } else {
            console.error("Fetch failed in batch:", result.reason);
          }
        });
  
        await delay(100); // Optional: reduce server load
      }
  
      setData(results);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      toast.error("Error fetching Pokémon data");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ data, loading, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
