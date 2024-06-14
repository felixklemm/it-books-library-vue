<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBooksStore } from '@/stores/books'
const route = useRoute()
const booksStore = useBooksStore()
const book = booksStore.books.find((book) => book.isbn === route.params.isbn) // would be nice to define a 404 block in case book is not found

const back = () => history.back() // using history API to go back, not router
</script>
<template>
  <main class="container">
    <h1>
      {{ book?.title }}<br />
      <small>{{ book?.subTitle }}</small>
    </h1>
    <section class="row">
      <div class="column column-67">
        <h3>Abstract</h3>
        <p>
          {{ book?.abstract }}
        </p>
        <h4>Details</h4>
        <ul>
          <li><strong>Author:</strong> {{ book?.author }}</li>
          <li><strong>Publisher:</strong> {{ book?.publisher }}</li>
          <li><strong>Pages:</strong> {{ book?.numPages }}</li>
        </ul>
        <button class="button button-outline" @click="back">Back</button>
      </div>
      <div class="column column-33">
        <img :src="book?.cover" :alt="`Cover: ${book?.title}`" />
      </div>
    </section>
  </main>
</template>
