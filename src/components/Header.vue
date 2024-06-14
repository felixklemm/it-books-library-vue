<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import { useBooksStore } from '@/stores/books'
import { computed } from 'vue'
const favoritesStore = useFavoritesStore()
const booksStore = useBooksStore()
const favoriteBooks = computed(() =>
  booksStore.books.filter((book) => favoritesStore.favorites.includes(book.isbn))
)
const favoritesCount = computed(() => favoriteBooks.value.length) // using initial favorites count (not the filtered one)
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="column"><p class="logo">IT.Book.Library</p></div>
        <div class="column">
          <nav class="mainnav">
            <router-link to="/" class="mainnav-link">Books</router-link>
            <router-link to="/favorites" class="mainnav-link">
              Favorites <span class="mainnav-number">{{ favoritesCount }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
