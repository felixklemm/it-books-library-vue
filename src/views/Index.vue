<script setup lang="ts">
import type { Book } from '@/stores/books'
import BookTable from '@/components/Book/Table.vue'
import { useBooksStore } from '@/stores/books'
import { useFavoritesStore } from '@/stores/favorites'
import { ref, computed, onMounted } from 'vue'
import IconFavFilled from '@/components/Icon/FavFilled.vue'
import IconFav from '@/components/Icon/Fav.vue'
import BookFilter from '@/components/Book/Filter.vue'

const booksStore = useBooksStore()
const favoritesStore = useFavoritesStore()

const books = computed(() => booksStore.books)
const filteredBooks = ref(books.value)
const booksCount = computed(() => filteredBooks.value.length)

const addFavorite = (isbn: string) => favoritesStore.addFavorite(isbn)
const onFiltered = (filtered: Book[]) => (filteredBooks.value = filtered)

onMounted(async () => {
  await booksStore.fetchBooks()
  filteredBooks.value = books.value
  if (booksStore.error) {
    console.error(booksStore.error) // better handling here
  }
})
</script>
<template>
  <main class="container">
    <h2>{{ booksCount === 1 ? '1 Book' : `${booksCount} Books` }} displayed</h2>
    <BookFilter :books="books" @on-filtered="onFiltered" />
    <section class="row">
      <div class="column">
        <BookTable :books="filteredBooks">
          <template #action="actionProps">
            <IconFavFilled v-if="actionProps.isFavorite" />
            <IconFav v-else @click="addFavorite(actionProps.bookIsbn)" />
          </template>
        </BookTable>
      </div>
    </section>
  </main>
</template>
