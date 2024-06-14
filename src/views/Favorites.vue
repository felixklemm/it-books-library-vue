<script setup lang="ts">
import type { Book } from '@/stores/books'
import { computed, onMounted, ref } from 'vue'
import BookTable from '@/components/Book/Table.vue'
import BookFilter from '@/components/Book/Filter.vue'
import IconTimes from '@/components/Icon/Times.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useBooksStore } from '@/stores/books'

const favoritesStore = useFavoritesStore()
const booksStore = useBooksStore()
const favoriteBooks = computed(() =>
  booksStore.books.filter((book) => favoritesStore.favorites.includes(book.isbn))
)
const favoritesCount = computed(() => favoriteBooks.value.length) // using initial favorites count (not the filtered one)

const filteredFavoriteBooks = ref(favoriteBooks.value)
const removeFavorite = (isbn: string) => favoritesStore.removeFavorite(isbn)
const onFiltered = (filtered: Book[]) => (filteredFavoriteBooks.value = filtered)

onMounted(async () => {
  await booksStore.fetchBooks()
  filteredFavoriteBooks.value = favoriteBooks.value
  if (booksStore.error) {
    console.error(booksStore.error) // better handling here
  }
})
</script>
<template>
  <main class="container">
    <h2>{{ favoritesCount === 1 ? '1 Favorite' : `${favoritesCount} Favorites` }} on your list</h2>
    <BookFilter :books="favoriteBooks" @on-filtered="onFiltered" />
    <section class="row">
      <div class="column">
        <BookTable :books="filteredFavoriteBooks">
          <template #action="actionProps">
            <IconTimes @click="removeFavorite(actionProps.bookIsbn)" />
          </template>
        </BookTable>
      </div>
    </section>
  </main>
</template>
