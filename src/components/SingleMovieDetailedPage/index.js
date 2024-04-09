import React, { useState, useEffect } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';

const SingleMovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCast, setMovieCast] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [loadingCast, setLoadingCast] = useState(true);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);

    // Accessing path parameters
    const { movie } = useParams();

    useEffect(() => {
        fetchMovieDetail();
        fetchMovieCast();
    }, [movie]);

    const fetchMovieDetail = async () => {
        try {
            setLoadingDetails(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=60d7c74b69bb1f98d72e9bf5f46c9a6d&language=en-US`);
            const data = await response.json();
            setMovieDetails(data);
            // Set the backdrop image URL
            setBackgroundImageUrl(`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`);
            setLoadingDetails(false);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setLoadingDetails(false);
        }
    };

    const fetchMovieCast = async () => {
        try {
            setLoadingCast(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie}/credits?api_key=60d7c74b69bb1f98d72e9bf5f46c9a6d&language=en-US`);
            const data = await response.json();
            setMovieCast(data);
            setLoadingCast(false);
        } catch (error) {
            console.error('Error fetching movie cast:', error);
            setLoadingCast(false);
        }
    };

    return (
        <div className='bg-container'>
            {loadingDetails || loadingCast ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {/* Use the dynamically fetched backdrop image */}
                    <div className="background-image" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                        {movieDetails && (
                            <>
                                <h2>{movieDetails.title}</h2>
                                <p>Rating: {movieDetails.vote_average}/10</p>
                                <p>Duration: {movieDetails.runtime} minutes</p>
                                <p>Type: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                                <p>Release Date: {movieDetails.release_date}</p>
                                <p>{movieDetails.overview}</p>
                            </>
                        )}
                    </div>
                    
                    {movieCast && movieCast.cast && movieCast.cast.length > 0 && (
                        <div>
                            <h2>Cast</h2>
                            <div className="cast-list">
                                {movieCast.cast.map((actor) => (
                                    actor.profile_path && (
                                        <div key={actor.id} className="actor">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                                                alt={actor.name}
                                            />
                                            <div>
                                                <h3>{actor.name}</h3>
                                                <p>Character: {actor.character}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleMovieDetails;
