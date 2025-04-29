import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

const Lists: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const types = [
    "fire", "water", "grass", "poison", "normal", "fighting",
    "electric", "ground", "fairy", "bug", "rock", "ghost",
    "steel", "psychic", "ice", "dragon",
  ];

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const result = data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      });

      const pokemonData = await Promise.all(result);
      setData(pokemonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredData = data.filter((pokemon) => {
    const matchesType = selectedCategory
      ? pokemon.types.some(
          (typeObj: any) => typeObj.type.name.toLowerCase() === selectedCategory
        )
      : true;

    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesName;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = (type: string) => {
    setSelectedCategory(type);
    setShowMobileFilters(false);
  };

  return (
    <div className="relative container px-2 md:px-4 py-4 mx-auto">
      {loading && <Loader />}

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          className="w-full border p-2 font-medium rounded-md bg-blue-50"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>

        {showMobileFilters && (
          <div className="absolute top-20 left-4 right-4 z-50 bg-white border p-4 rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Filters</span>
              <span
                className="text-blue-600 cursor-pointer text-sm"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
              >
                Reset
              </span>
            </div>

            <div>
              <div
                className="flex justify-between items-center cursor-pointer p-2 border-b"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>Categories</span>
                <span>
                  {isCategoryOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                </span>
              </div>

              {isCategoryOpen && (
                <ul className="pl-2 mt-1">
                  {types.map((type) => (
                    <li
                      key={type}
                      className={`p-1 cursor-pointer rounded hover:bg-blue-100 ${
                        selectedCategory === type ? "bg-blue-200 font-semibold" : ""
                      }`}
                      onClick={() => handleCategorySelect(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block w-full md:w-1/4 border p-3 rounded-md h-fit">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Filters</span>
            <span
              className="text-blue-600 cursor-pointer text-sm"
              onClick={() => {
                setSelectedCategory(null);
                setSearchTerm("");
              }}
            >
              Reset
            </span>
          </div>

          <div>
            <div
              className="flex justify-between items-center cursor-pointer p-2 border-b"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span>Categories</span>
              <span>
                {isCategoryOpen ? <AiOutlineUp /> : <AiOutlineDown />}
              </span>
            </div>
            {isCategoryOpen && (
              <ul className="pl-2 mt-1">
                {types.map((type) => (
                  <li
                    key={type}
                    className={`p-1 cursor-pointer rounded hover:bg-blue-100 ${
                      selectedCategory === type ? "bg-blue-200 font-semibold" : ""
                    }`}
                    onClick={() => handleCategorySelect(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              className="w-full border p-2 rounded-md outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.length > 0 ? (
              paginatedData.map((pokemon: any) => (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites?.front_default}
                  types={pokemon.types.map((typeObj: any) => typeObj.type.name)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No Pokémon found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 w-full overflow-x-auto">
            <Pagination className="flex flex-wrap justify-center gap-2 min-w-max">
              <PaginationContent className="flex flex-wrap justify-center gap-2 hover:cursor-pointer">
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .reduce((acc: (number | string)[], page, i, arr) => {
                    if (i > 0 && page - (arr[i - 1] as number) > 1) {
                      acc.push("...");
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((item, index) => (
                    <PaginationItem key={index}>
                      {item === "..." ? (
                        <span className="px-3 py-1">...</span>
                      ) : (
                        <PaginationLink
                          isActive={currentPage === item}
                          onClick={() => handlePageChange(item as number)}
                        >
                          {item}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
