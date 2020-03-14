import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

// Components
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'https://movie-list-app-server.herokuapp.com/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Marvel Movie List</h1>
        <p id='intro'>The Marvel Cinematic Universe needs your help to become complete. Can you do it?</p>
        <MovieList />
        <AddMovie />
      </div>
    </ApolloProvider>
  );
}

export default App;
