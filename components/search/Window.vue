<template>
  <SearchResults :posts="results" />
</template>

<script>
import SearchResults from '@/components/search/Results'

export default {
  name: 'SearchWindow',
  components: {
    SearchResults
  },
  data () {
    return {
      results: []
    }
  }
}
</script>
