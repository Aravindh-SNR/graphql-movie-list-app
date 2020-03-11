import React, { useState, useRef } from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_MOVIES, GET_DIRECTORS, ADD_MOVIE} from '../queries/queries';

const AddMovie = () => {
    const {loading, data} = useQuery(GET_DIRECTORS);
    const [addMovie] = useMutation(ADD_MOVIE);
    
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [directorId, setDirectorId] = useState('');

    const directorOption = useRef();

    const handleSubmit = event => {
        event.preventDefault();
        addMovie({
            variables: {
                title,
                genre,
                directorId
            },
            refetchQueries: [{query: GET_MOVIES}]
        });
        setTitle('');
        setGenre('');
        setDirectorId('');
        directorOption.current.value = '';
    };

    return (
        <form id='add-movie' onSubmit={handleSubmit}>
            <div className='field'>
                <label>Movie title:</label>
                <input type='text' value={title} onChange={event => setTitle(event.target.value)}
                    autoFocus autoComplete='off' required
                />
            </div>

            <div className='field'>
                <label>Genre:</label>
                <input type='text' value={genre} onChange={event => setGenre(event.target.value)}
                    autoComplete='off' required
                />
            </div>

            <div className='field'>
                <label>Director:</label>
                <select required ref={directorOption}
                    onChange={event => setDirectorId(event.target.value)}>
                    <option value=''>Select director</option>
                    {
                        loading ?
                        <option disabled>Loading directors...</option> :
                        data.directors.map(director => {
                            return (
                                <option key={director.id} value={director.id}>{director.name}</option>
                            );
                        })
                    }
                </select>
            </div>

            <button>+</button>
        </form>
    );
};

export default AddMovie;