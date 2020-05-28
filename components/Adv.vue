
<template>
  <div :class="'ad-item-wrapper mainpage-ad-grid-' + pos">
    <div class="ad-item">
      <a class="ad-item-link" :href="link"><img class="ad-item-img" :src="img"></a>
      <a class="link-to-ad-prices link-underline" href="#">Разместить рекламу</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Adv',
  props: {
    link: {
      type: String,
      required: true,
      default: () => '#'
    },
    img: {
      type: String,
      required: true,
      default: () => '/images/adv-default.jpg'
    },
    pos: {
      type: String,
      required: true,
      default: () => 1
    }
  }
}
</script>
