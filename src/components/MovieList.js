import React, { useState } from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_MOVIES} from '../queries/queries';

//Components
import MovieDetails from './MovieDetails';
import Loader from './loader/Loader';

// Component to display all the movies in the list

const MovieList = () => {

    // Query to get list of movies
    const {loading, data} = useQuery(GET_MOVIES);

    // Store id of movie selected by user
    const [movieId, setMovieId] = useState(null);
    
    return (
        <div>
            {
                loading ?
                <Loader view='load-list' />
                :
                data.movies.length ?
                <ul id='movie-list'>
                    {data.movies.map(movie => {
                        return (
                            <li key={movie.id} onClick={event => setMovieId(movie.id)}>{movie.title}</li>
                        )
                    })}
                </ul>
                :
                <p id='empty-message'>No movies in the list at the moment.</p>
            }
            <MovieDetails id={movieId} setMovieId={setMovieId} />
        </div>
    );
};

export default MovieList;