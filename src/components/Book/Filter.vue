<script setup lang="ts">
import type { PropType } from 'vue'
import type { Book } from '@/stores/books'
import { defineProps, defineEmits, ref, computed, watch } from 'vue'

const emit = defineEmits(['on-filtered'])
const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
})
const searchQuery = ref('')
const filterPublisher = ref('')
const publishers = computed(() => Array.from(new Set(props.books.map((book) => book.publisher)))) // get unique publishers, nice to: only show publishers of the filtered list

const filteredBooks = computed(() => {
  return props.books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const publisherMatch = book.publisher
      .toLowerCase()
      .includes(filterPublisher.value.toLowerCase())
    return titleMatch && publisherMatch
  })
})

watch(
  () => filteredBooks.value,
  () => emit('on-filtered', filteredBooks.value)
)
</script>
<template>
  <section class="row filter-search">
    <form action="#" class="column">
      <label for="search">Search by Title</label>
      <input type="text" id="search" v-model="searchQuery" />
    </form>
    <form action="#" class="column column-33">
      <label for="by-publisher">Filter by Publisher</label>
      <select id="by-publisher" v-model="filterPublisher">
        <option value="">-</option>
        <option v-for="publisher of publishers" :key="publisher" :value="publisher">
          {{ publisher }}
        </option>
      </select>
    </form>
  </section>
</template>
