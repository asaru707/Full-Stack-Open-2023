import { gql } from "@apollo/client"

const AUTHOR_DETAILS  = gql`
fragment authorDetails on Author {
  id
  name
  born
  bookCount
}
`

const BOOK_DETAILS = gql`
fragment bookDetails on Book {
  id
  title
  published
  genres
  author{
    ...authorDetails
  }
}
${AUTHOR_DETAILS}
`

export const UPDATE_BORN = gql`
  mutation updateBorn($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      id
      born
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`
export const FILTER_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      genres
      published
      title
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      genres
      id
    }
  }
`
export const BOOK_ADDED = gql`
subscription{
  bookAdded{
    ...bookDetails
  }
}
${BOOK_DETAILS}
`
export const USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const UPDATE_USER = gql`
mutation updateUser($favoriteGenre: String!){
  editUser(favoriteGenre: $favoriteGenre){
    username
    favoriteGenre
  }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`