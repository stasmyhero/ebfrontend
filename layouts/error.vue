<template>
  <main>
    <div v-if="error.statusCode === 404" style="margin:0 auto">
      <h1>404</h1>
      <p>Страница не найдена :( </p>
      <nuxt-link to="/">
        Вернуться на главную
      </nuxt-link>
    </div>
    <h1 v-else>
      Произошла ошибка
    </h1>
  </main>
</template>

<script>
export default {
  props: ['error'],
  layout: 'e'
}
</script>
