import React, { useState } from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_MOVIES} from '../queries/queries';
import MovieDetails from './MovieDetails';

const MovieList = () => {
    const {loading, error, data} = useQuery(GET_MOVIES);

    const [movieId, setMovieId] = useState(null);
    
    if (loading) {
        return <p>Loading movies...</p>
    } else if (error) {
        return <p>Error loading movies.</p>
    } else {
        return (
            <div>
                <ul id='movie-list'>
                    {data.movies.map(movie => {
                        return (
                            <li key={movie.id} onClick={event => setMovieId(movie.id)}>{movie.title}</li>
                        )
                    })}
                </ul>
                <MovieDetails id={movieId} />
            </div>
        )
    }
};

export default MovieList;