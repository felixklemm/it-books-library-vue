import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBooks } from '@/clients/api'

export interface Book {
  title: string
  subTitle: string
  isbn: string
  abstract: string
  author: string
  publisher: string
  price: number
  numPages: number
  cover: string
}

// my preferred way of defining the store
export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchBooks() {
    loading.value = true
    error.value = null
    try {
      const response = await getBooks()
      books.value = response.data
    } catch (err) {
      error.value = (err as Error).message || 'Error loading books'
    } finally {
      loading.value = false
    }
  }
  return {
    books,
    loading,
    error,
    fetchBooks
  }
})
