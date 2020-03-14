import React from 'react';
import './Loader.css';

// Component for displaying a loading animation

const Loader = ({view}) => {
    return (
        // Credit: https://loading.io/css/

        <div className={`lds-facebook ${view}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;