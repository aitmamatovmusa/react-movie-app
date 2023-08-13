import { useState } from 'react';
import { httpService } from '../api/axios';
import { Link } from 'react-router-dom';
import Loader from './ui/Loader';

function MovieSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [filterType, setFilterType] = useState('movie');

  async function handleSearch(event) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const { data: { Search } } = await httpService.get(
        '/',
        {
          params: {
            s: searchValue,
            type: filterType,
          }
        })

      setMovies(Search);
    } catch (error) {
      console.error("Error fetching movies")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <form className="flex">
        <input
          type="text"
          className="border rounded-l py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a movie"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border mx-2 rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-r"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading ? <Loader /> : movies.map((movie) => (
          <li key={movie.imdbID} className="bg-white rounded-lg shadow-md p-4">
            <Link to={`movie/${movie.imdbID}`} target="_blank">
              <img
                src={movie.Poster}
                alt={`${movie.Title} Poster`}
                className="mb-2"
              />
            </Link>
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
