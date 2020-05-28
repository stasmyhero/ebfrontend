<template>
  <div class="search-request-item">
    {{ block }}
    <span class="search-request-item-delete" @click="$root.$emit('deleteBlock', ind)">
      X
    </span>
  </div>
</template>

<script>

export default {
  name: 'InputBlock',
  props: {
    block: {
      type: [String, Boolean],
      default: () => { return false }
    },
    ind: {
      type: [Number, Boolean],
      default: () => { return false }
    }
  }
}
</script>
