import React, { Fragment } from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_MOVIE, DELETE_MOVIE, GET_MOVIES} from '../queries/queries';

// Components
import Loader from './loader/Loader';

// Component to display details of selected movie with an option to delete it

const MovieDetails = ({id, setMovieId}) => {

    // Query to get movie details
    const {loading, data} = useQuery(GET_MOVIE, {
        variables: {id}
    });

    // Mutation to delete movie
    const [deleteMovie] = useMutation(DELETE_MOVIE);

    // Function to execute mutation and refetch movie list without the deleted movie
    const handleDelete = movieId => {
        deleteMovie({
            variables: {
                id: movieId
            },
            refetchQueries: [{query: GET_MOVIES}]
        })
        .then(({data}) => {
            data.deleteMovie === 1 && setMovieId(null);
        });
    };

    return (
        <div id='movie-details'>
            {
                id ?
                    loading ?
                    <Loader view='load-detail' />
                    :
                    <Fragment>
                        <div className='movie-details-header'>
                            <h2>{data.movie.title}</h2>
                            <img src='https://img.icons8.com/windows/32/000000/trash.png'
                                alt='Remove movie' title='Remove movie'
                                onClick={() => handleDelete(data.movie.id)}
                            />
                        </div>
                        <p>Released in: {data.movie.year}</p>
                        <p>Directed by: {data.movie.director.name}</p>
                        <p>All movies in the list directed by this director:</p>
                        <ul className='other-movies'>
                            {
                                data.movie.director.movies.map(movie => <li key={movie.id}>{movie.title}</li>)
                            }
                        </ul>
                    </Fragment>
                :
                <p>Select a movie to view its details or remove it from the list.</p>
            }
        </div>
    );
};

export default MovieDetails;