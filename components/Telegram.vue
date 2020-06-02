<template>
  <div class="social-item-wrapper telegram-item-wrapper" @mouseenter="stopAnim()" @mouseleave="playAnim()">
    <a class="social-item telegram-item" :href="link">
      <div class="telegram-item-bg" />
      <div class="telegram-item-logo" />
      <div class="social-item-account rotating" :class="'rotating-' + playState" />
      <div class="social-item-title">Наш канал<br>в&nbsp;<i>Телеграме</i></div>
    </a>
  </div>
</template>

<script>

export default {
  name: 'Telegram',
  props: {
    link: {
      type: String,
      required: true,
      default: () => 'http://www.telegram.com'
    }
  },
  data () {
    return {
      playState: 'play'
    }
  },
  methods: {
    playAnim () {
      this.playState = 'play'
    },
    stopAnim () {
      this.playState = 'paused'
    }
  }
}
</script>

<style scoped>
  @-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
  animation-play-state:paused;

}

.rotating-play {
  animation-play-state: running !important;
}

</style>
