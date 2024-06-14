<script setup lang="ts">
import type { PropType } from 'vue'
import type { Book } from '@/stores/books'

import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const router = useRouter()
defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
})
const favoritesStore = useFavoritesStore()

const viewDetail = (book: Book) => router.push({ name: 'book-detail', params: { isbn: book.isbn } })
const isFavorite = (isbn: string) => favoritesStore.isFavorite(isbn)
</script>
<template>
  <table>
    <thead>
      <tr>
        <th class="first-col">&nbsp;</th>
        <th>Title</th>
        <th>ISBN</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody v-if="books.length">
      <tr v-for="book in books" :key="book.isbn">
        <td>
          <button class="button button-clear fav-btn">
            <slot name="action" :is-favorite="isFavorite(book.isbn)" :book-isbn="book.isbn"></slot>
          </button>
        </td>
        <td>{{ book.title }}</td>
        <td>{{ book.isbn }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.publisher }}</td>
        <td>
          <button class="button" @click="viewDetail(book)">Detail</button>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="6" style="text-align: center">No books found</td>
      </tr>
    </tbody>
  </table>
</template>
