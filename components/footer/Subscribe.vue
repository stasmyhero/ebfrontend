<template>
  <div class="footer-email-subscribe">
    <div class="footer-email-subscribe-header">
      <h3>
        <i>Еженедельная</i>
      </h3>
      <h4>Рассылка новостей</h4>
    </div>
    <template v-if="!isSubscribeSuccess">
      <form class="footer-email-subscribe-form" @submit.prevent="subsrcibe">
        <div class="input-wrapper">
          <input type="email" class="subscribe-form-input" required>
          <label class="floating-label" data-placeholder="Ваш имейл" />
        </div>
        <input type="submit" class="subscribe-form-submit" value="Подписаться">
      </form>
      <div class="footer-email-subscribe-note">
        Нажимая кнопку&nbsp;«Подписаться», вы&nbsp;соглашаетесь с&nbsp;
        <a
          class="link-underline"
          href="#"
        >условиями обработки персональных данных</a>
      </div>
    </template>
    <template v-if="isSubscribeSuccess">
      <div
        class=""
        template
      />
    </template>
    <template v-if="isAlreadySubscribed">
      <div>Данный email-адрес уже находится в рассылке </div>
      <a @click="toSubsrcibeForm()">Назад</a>
    </template>

    <script>
      import urls from '@/assets/js/url'

      export default {
      name: 'Subscribe',
      data () {
      return {
      email: '',
      isError: false,
      isSubscribeSuccess: false,
      isUnSubscribeSuccess: false,
      apiKey: ''
      }
      },
      methods: {
      async subsrcibe () {
      const data = {
      api_key: this.apiKey,
      email: this.email,
      lists: 1
      }
      const res = await this.$axios.post(`${urls.apiBaseURL}/newsletter/v1/subscribe`, urls.restHeaders.data)
      this.isSuccess = true
      },
      async unSubscribe () {
      const data = {
      api_key: this.apiKey,
      email: this.email,
      lists: 1
      }
      const res = await this.$axios.post(`${urls.apiBaseURL}/newsletter/v1/unsubscribe`, urls.restHeaders.data)
      this.isUnSubscribeSuccess = true
      }
      }
      }
    </script>
  </div>
</template>
