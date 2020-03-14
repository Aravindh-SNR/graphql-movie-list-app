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
mutation ($title: String!, $year: Int!, $directorId: ID!) {
    addMovie (title: $title, year: $year, directorId: $directorId) {
        id
    }
}
`);

export const GET_MOVIE = gql(`
query ($id: ID) {
    movie (id: $id) {
        id,
        title,
        year,
        director {
            name,
            movies {
                id
                title
            }
        }
    }
}
`);

export const DELETE_MOVIE = gql(`
mutation ($id: ID!) {
    deleteMovie (id: $id)
}
`);