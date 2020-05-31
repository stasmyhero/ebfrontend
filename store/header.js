export const state = () => ({
  headerClass: '',
  isMobile: false,
  isBurger: false
})

export const mutations = {
  setHeaderClass (state, headerClass) {
    state.headerClass = headerClass
  }
}

export const actions = {
  getHeaderClass ({ commit }) {
    if (this.$route.name === 'index') { return 'header-main-page' }
    if (this.$route.name === 'search' || this.$route.name === 'search-s') { return 'header-search-page' }
    return 'header-inner-page'
  }
}

export const getters = {
  headerClass: s => s.headerClass
}
