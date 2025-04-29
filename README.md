1. Project Overview
Pokémon Explorer is a responsive web application built with React + TypeScript that allows users to:

Browse Pokémon cards (fetched from PokéAPI).

Filter Pokémon by Type (fire, water, grass, etc.).

Search Pokémon by name.

Navigate through paginated results.

Mobile-optimized with collapsible filter drawer.

Graceful loading indicators and error handling with toast notifications.

The project demonstrates real-world frontend skills such as:

Dynamic data fetching

Filtering and searching

Pagination management

Responsive UI/UX

State management (with React Hooks)

Error handling

Component reusability

2. Tech Stack

Technology	Purpose
React.js	Core frontend library
TypeScript	Type safety for better maintainability
TailwindCSS	Utility-first CSS framework (optional, can use plain CSS)
React Icons	Beautiful icon integration
React Hot Toast	Toast notifications for success/error feedback
PokéAPI	Public API for Pokémon data
3. Folder Structure
bash
Copy
Edit
src/
│
├── components/
│   ├── Card/
│   │   └── Card.tsx     # Reusable card component to display Pokémon
│   ├── Loader/
│   │   └── Loader.tsx   # Loading spinner
│
├── pages/
│   └── Lists.tsx        # Main page displaying Pokémon list, filters, search, pagination
│
└── App.tsx              # Application routes
└── index.tsx            # React root entry point
└── styles/              # (Optional) Custom global styles
4. Features
4.1 Fetch Pokémon Data
Fetch 150 Pokémon from PokéAPI.

On successful fetch, each Pokémon's detailed info is also fetched individually (for types, images).

4.2 Filters
Users can filter Pokémon by selecting a Type.

A Reset button allows clearing filters.

4.3 Search
Users can search Pokémon by name using a search input.

Search is case-insensitive.

4.4 Pagination
Displays 9 Pokémon per page.

Previous / Next buttons to navigate.

Displays compact page numbers with ellipses (...) for better UX.

4.5 Responsive Design
On desktop, filters are shown as a sidebar.

On mobile, filters open as an absolute overlay when clicking "Show Filters" button.

4.6 Loading and Error Handling
Loader spinner shown while fetching data.

Toast notifications shown if data fetching fails.




5. How to Run Locally
bash
Copy
Edit
# Clone the repository
git clone https://github.com/rinkupay/pokemon_api.git
cd pokemon_api

# Install dependencies
npm install

# Start development server
npm run dev



6. Deployed in vercel 
 hosted link : 

