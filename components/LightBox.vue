<template>
  <div class="gallery-lightbox-wrapper">
    <transition-group name="fade">
      <div v-show="isShow && images.length > 0" key="overlay" class="gallery-lightbox-overlay" />
      <div v-show="isShow && images.length > 0" key="cont" class="gallery-lightbox-cont">
        <div class="gallery-lightbox-left" @click="left" />
        <div class="gallery-lightbox-body">
          <img class="gallery-lightbox-current-image" :src="currentImg">
          <div class="gallery-lightbox-numb">
            {{ currentIndex+1 }} / {{ imgCount }}
          </div>
        </div>
        <div class="gallery-lightbox-right" @click="right">
          R
        </div>
        <div class="gallery-lightbox-close" @click="close">
          X
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'LightBox',
  data () {
    return {
      isShow: false,
      images: [],
      currentImg: null,
      currentIndex: 0,
      imgCount: 0,
      lastGalleryDataID: -1
    }
  },
  mounted () {
    this.$root.$on('openLightBox', (galleryData) => { this.load(galleryData); this.open() })
  },
  methods: {
    load (galleryData) {
      if (galleryData.images.length > 0) {
        for (const image of galleryData.images) {
          this.images.push(image.querySelector('img').getAttribute('src') ?? '')
        }
        this.imgCount = galleryData.images.length
        this.currentIndex = galleryData.currentIndex
        this.currentImg = this.images[this.currentIndex]
      }
    },
    left () {
      if (this.currentIndex !== 0) {
        this.currentIndex -= 1
      } else {
        this.currentIndex = (this.imgCount - 1)
      }
      this.currentImg = this.images[this.currentIndex]
    },
    right () {
      if (this.currentIndex !== (this.imgCount - 1)) {
        this.currentIndex += 1
      } else {
        this.currentIndex = 0
      }
      this.currentImg = this.images[this.currentIndex]
    },
    open () {
      document.body.style.overflow = 'hidden'
      this.isShow = true
    },
    close () {
      this.isShow = false
      document.body.style.overflow = 'scroll'
      this.$root.$emit('closeLightBox')
    }
  }
}
</script>

<style scoped>
  .gallery-lightbox-wrapper {
    z-index: 101;
  }

  .gallery-lightbox-overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #4444;
    opacity: 0.8;
    z-index: 101;
    min-width: 100vw;
  }

  .gallery-lightbox-cont {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 102;
    top:0;
  }

  .gallery-lightbox-left {
    width: 2rem;
  }

  .gallery-lightbox-right {
    width: 2rem;
  }
</style>
