import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../../contexPovider/ContextProvider"; // Import the context
import ListView from "@/components/Card/ListView";
import { RiShareForwardFill } from "react-icons/ri";
import toast from "react-hot-toast";
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



const Lists: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState<"name" | "id" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [selectedPokemons, setSelectedPokemons] = useState<any[]>([]);

  const { data, loading } = usePokemon(); // Access context

  const types = [
    "fire", "water", "grass", "poison", "normal", "fighting",
    "electric", "ground", "fairy", "bug", "rock", "ghost",
    "steel", "psychic", "ice", "dragon",
  ];

  const navigate = useNavigate();



  const filteredData = useMemo(() => {
    return data
      .filter((pokemon) => {
        const matchesType = selectedCategory
          ? pokemon.types.some(
              (typeObj: any) =>
                typeObj.type.name.toLowerCase() === selectedCategory
            )
          : true;
        const matchesName = pokemon.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesType && matchesName;
      })
      .sort((a, b) => {
        if (!sortOption) return 0;
        let aValue = sortOption === "name" ? a.name : a.id;
        let bValue = sortOption === "name" ? b.name : b.id;
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, selectedCategory, searchTerm, sortOption, sortDirection]);

  const totalPages = useMemo(() => Math.ceil(filteredData.length / pageLimit), [filteredData.length, pageLimit]);
  const paginatedData = useMemo(
    () =>
      filteredData.slice((currentPage - 1) * pageLimit, currentPage * pageLimit),
    [filteredData, currentPage, pageLimit]
  );



  // Handle page change

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageLimit(Number(e.target.value));
      setCurrentPage(1);
    },
    []
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, pageLimit]);

  const handleCategorySelect = useCallback((type: string) => {
    setSelectedCategory(type);
    setShowMobileFilters(false);
  }, []);

  // Handle select/unselect Pokemon
  const handleSelectPokemon = useCallback((pokemon: any) => {
    setSelectedPokemons((prev) => {
      const alreadySelected = prev.some((p) => p.id === pokemon.id);
  
      if (alreadySelected) {
        // Deselect if already selected
        return prev.filter((p) => p.id !== pokemon.id);
      } else if (prev.length < 2) {
        // Only add if less than 2 selected
        return [...prev, pokemon];
      } else {
        // Optionally show a warning
        toast.error("You can only compare 2 Pokémon at a time");
        return prev;
      }
    });
  }, []);
  

  // Handle navigate to compare page
  const handleCompare = useCallback(() => {
    navigate("/compare", { state: { selectedPokemons } });
  }, [navigate, selectedPokemons]);


    // Handle sort option change
     const handleSortOptionChange = useCallback((option: "name" | "id") => {
    if (sortOption === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  }, [sortOption, sortDirection]);



  return (
    <div className="relative container px-2 md:px-4 py-4 mx-auto">
      {loading && <Loader />}

      {/* Mobile Filters */}
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

            {/* Categories */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer p-2 border-b"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>Categories</span>
                <span>{isCategoryOpen ? <AiOutlineUp /> : <AiOutlineDown />}</span>
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
        {/* Sidebar */}
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

          {/* Categories */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer p-2 border-b"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span>Categories</span>
              <span>{isCategoryOpen ? <AiOutlineUp /> : <AiOutlineDown />}</span>
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

          {/* Sort Options */}
          <div
              className="flex justify-between items-center cursor-pointer p-2 border-b"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span>Sort By</span>
              <span>{isSortOpen ? <AiOutlineUp /> : <AiOutlineDown />}</span>
            </div>
            {isSortOpen && (
              <ul className="pl-2 mt-1 flex flex-row gap-4">
               <div className="flex justify-center items-center gap-1"> <label htmlFor="name">Name</label>
               <li><input type="radio" name="sort" id="name" checked={sortOption === "name"}
                    onChange={() => handleSortOptionChange("name")} /></li></div>
               <div className="flex justify-center items-center gap-1"> <label htmlFor="id">ID</label>
               <li><input type="radio" name="sort" id="id" checked={sortOption === "id"}
                    onChange={() => handleSortOptionChange("id")} /></li></div>
               
              </ul>
            )}
          </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Search & Limit */}
          <div className="flex w-full max-w-[60%] justify-between items-center mb-4 flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              className="flex-1 border p-2 rounded-md outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
           
          </div>

          {/* List View */}
          <div className="grid gap-4">
            {paginatedData.length > 0 ? (
              paginatedData.map((pokemon: any) => (
                <ListView
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites?.front_default}
                  types={pokemon.types.map((typeObj: any) => typeObj.type.name)}
                  abilities={pokemon.abilities}
                  base_experience={pokemon.base_experience}
                  height={pokemon.height}
                  weight={pokemon.weight}
                  isSelected={selectedPokemons.some((p) => p.id === pokemon.id)}
                  onToggleSelect={() => handleSelectPokemon(pokemon)}
                  cries={pokemon.sprites?.front_shiny}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No Pokémon found.
              </div>
            )}
          </div>

          {/* Compare Button */}
          {selectedPokemons.length === 2 && (
            <button
              onClick={handleCompare}
              className="absolute cursor-pointer flex items-center gap-2 top-0 right-0 mt-4 px-4 py-2 bg-blue-400 text-white rounded-md"
            >
              <span>Compare</span> <span>
              <RiShareForwardFill  size={24}/>
              </span>
            </button>
          )}

          {/* Pagination */}
          <div className="mt-6 w-full overflow-x-auto">
            <Pagination className="flex flex-wrap justify-center gap-2 min-w-max">
              <PaginationContent className="flex flex-wrap justify-center gap-2 hover:cursor-pointer">
                <PaginationItem>
                  <PaginationPrevious
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
                  }, [] as (number | string)[])
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
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>


               {/* Items per Page Dropdown */}
           <div className="flex items-center ml-4">
           <label className="text-sm font-medium mr-2">Items per page:</label>
            <select
              value={pageLimit}
              onChange={handleItemsPerPageChange}
              className="border p-2 rounded-md"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
           </div>


            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
