import { useState } from 'react';
import { httpService } from '../api/axios';

function MovieSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);

  async function handleSearch() {
    try {
      const { data: { Search } } = await httpService.get('/', { params: { s: searchValue } })
      setMovies(Search);
    } catch (error) {
      console.error("Error fetching movies")
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <div className="flex">
        <input
          type="text"
          className="border rounded-l py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a movie"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-r"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className="mb-2"
            />
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
