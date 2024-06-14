import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:4730',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getBooks = () => apiClient.get('/books')
export const getBook = (isbn: string) => apiClient.get(`/books/${isbn}`)
