<template>
  <div class="search-results-grid">
    <Post
      v-for="mypost in posts"
      :key="mypost.id"
      :post="mypost"
    />
  </div>
</template>
