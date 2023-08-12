import { BrowserRouter, Route, Routes } from "react-router-dom"
import MovieSearch from "./components/MovieSearch"
import MovieDetails from "./components/MovieDetails"

import "./assets/styles/app.scss"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
