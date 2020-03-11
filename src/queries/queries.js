// GraphQL queries and mutations

import {gql} from 'apollo-boost';

export const GET_MOVIES = gql(`
query {
    movies {
        id,
        title
    }
}
`);

export const GET_DIRECTORS = gql(`
query {
    directors {
        id,
        name
    }
}
`);

export const ADD_MOVIE = gql(`
mutation ($title: String!, $genre: String!, $directorId: ID!) {
    addMovie (title: $title, genre: $genre, directorId: $directorId) {
        id,
        title
    }
}
`);

export const GET_MOVIE = gql(`
query ($id: ID) {
    movie (id: $id) {
        id,
        title,
        genre,
        director {
            id,
            name,
            age
            movies {
                id
                title
            }
        }
    }
}
`);