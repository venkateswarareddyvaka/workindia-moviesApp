import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import SingleMovieDetails from './components/SingleMovieDetailedPage';
import TopRated from './components/TopRatedPage';
import UpcomingMovie from './components/UpcomingMoviePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/toprated" element={<TopRated />} />
          <Route exact path="/upcomingmovie" element={<UpcomingMovie />} />
          <Route exact path="/singlemovie/:movie" element={<SingleMovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
