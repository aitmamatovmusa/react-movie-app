import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpService } from "../api/axios";

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState()

  async function getMovie() {
    try {
      const { data } = await httpService.get("/", { params: { i: id } })
      setMovie(data)
    } catch (error) {
      console.error("Error fetching a movie")
    }
  }

  useEffect(() => {
    getMovie()
  })

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      {
        movie ? <>
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <div className="flex flex-col md:flex-row">
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className="mb-4 md:mr-4 md:w-1/4 rounded-lg shadow-md"
            />
            <div className="flex flex-col">
              <p><span className="font-bold">Year:</span> {movie.Year}</p>
              <p><span className="font-bold">Rated:</span> {movie.Rated}</p>
              <p><span className="font-bold">Runtime:</span> {movie.Runtime}</p>
              <p><span className="font-bold">Genre:</span> {movie.Genre}</p>
              <p><span className="font-bold">Director:</span> {movie.Director}</p>
              <p><span className="font-bold">Actors:</span> {movie.Actors}</p>
              <p><span className="font-bold">Plot:</span> {movie.Plot}</p>
              <p><span className="font-bold">Language:</span> {movie.Language}</p>
              <p><span className="font-bold">Country:</span> {movie.Country}</p>
              <p><span className="font-bold">Awards:</span> {movie.Awards}</p>
              <p><span className="font-bold">Ratings:</span></p>
              <ul>
                {movie.Ratings.map((rating) => (
                  <li key={rating.Source}>{rating.Source}: {rating.Value}</li>
                ))}
              </ul>
              <p><span className="font-bold">Metascore:</span> {movie.Metascore}</p>
              <p><span className="font-bold">IMDb Rating:</span> {movie.imdbRating}</p>
              <p><span className="font-bold">IMDb Votes:</span> {movie.imdbVotes}</p>
            </div>
          </div>
        </> : ""
      }
    </div>
  );
}

export default MovieDetails;
