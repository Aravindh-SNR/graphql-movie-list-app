import React, { Fragment } from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_MOVIE} from '../queries/queries';

const MovieDetails = ({id}) => {
    const {loading, data} = useQuery(GET_MOVIE, {
        variables: {id}
    });

    return (
        <div id='movie-details'>
            {
                id ?
                    loading ?
                    <p>Movie details loading...</p>
                    :
                    <Fragment>
                        <h2>{data.movie.title}</h2>
                        <p>{data.movie.genre}</p>
                        <p>{data.movie.director.name}</p>
                        <p>All movies by this director:</p>
                        <ul className='other-movies'>
                            {
                                data.movie.director.movies.map(movie => <li key={movie.id}>{movie.title}</li>)
                            }
                        </ul>
                    </Fragment>
                :
                <p>Click on a movie to see its information right here.</p>
            }
        </div>
    );
};

export default MovieDetails;