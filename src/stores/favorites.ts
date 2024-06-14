import { defineStore } from 'pinia'

// different syntax for defining the store
export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as string[]
  }),
  actions: {
    addFavorite(isbn: string) {
      if (!this.favorites.includes(isbn)) {
        this.favorites.push(isbn)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    },
    removeFavorite(isbn: string) {
      this.favorites = this.favorites.filter((fav) => fav !== isbn)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    isFavorite(isbn: string) {
      return this.favorites.includes(isbn)
    }
  }
})
