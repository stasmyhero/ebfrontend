<template>
  <div class="footer-email-subscribe">
    <div class="footer-email-subscribe-header">
      <h3>
        <i>Еженедельная</i>
      </h3>
      <h5>Рассылка новостей</h5>
    </div>
    <form class="footer-email-subscribe-form">
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
  </div>
</template>

<script>
export default {
  name: 'Subscribe'
}
</script>
