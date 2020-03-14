import React, { useState, useRef } from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {GET_MOVIES, GET_DIRECTORS, ADD_MOVIE} from '../queries/queries';

// Component to add a movie to the list

const AddMovie = () => {

    // Query to get list of directors to be displayed in Director select menu
    const {loading, data} = useQuery(GET_DIRECTORS);

    // Mutation to add movie
    const [addMovie] = useMutation(ADD_MOVIE);
    
    // Store details of movie to be added
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [directorId, setDirectorId] = useState('');

    // Movie title field and Director select menu
    const focusField = useRef();
    const directorOption = useRef();

    // Function to execute mutation and refetch movie list with newly added movie
    const handleSubmit = event => {
        event.preventDefault();
        addMovie({
            variables: {
                title,
                year,
                directorId
            },
            refetchQueries: [{query: GET_MOVIES}]
        });
        setTitle('');
        setYear('');
        setDirectorId('');

        // Restore form to original state after submission
        focusField.current.focus();
        directorOption.current.value = '';
    };

    return (
        <form id='add-movie' onSubmit={handleSubmit}>
            <div className='field'>
                <label>Movie title:</label>
                <input type='text' value={title} onChange={event => setTitle(event.target.value)}
                    autoFocus autoComplete='off' required ref={focusField}
                />
            </div>

            <div className='field'>
                <label>Year:</label>
                <input type='number' value={year} onChange={event => setYear(Number(event.target.value))}
                    autoComplete='off' required maxLength='4' min='2008' max={new Date().getFullYear()}
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

            <button title='Add movie'>+</button>
        </form>
    );
};

export default AddMovie;