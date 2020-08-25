<<<<<<< HEAD
export const state = () => ({
  headerClass: '',
  isMobile: false,
  isBurger: false
=======
export const strict = false

export const state = () => ({
  headerClass: 'header-main-page',
  isBurger: false,
  isMobile: false,
  isLogo: false,
  isShowMenu: false
>>>>>>> master
})

export const mutations = {
  setHeaderClass (state, headerClass) {
    state.headerClass = headerClass
<<<<<<< HEAD
=======
  },
  isBurger (state, val) {
    state.isBurger = val
  },
  isMobile (state, val) {
    state.isMobile = val
  },
  isLogo (state, val) {
    state.isLogo = val
  },
  isShowMenu (state, val) {
    state.isShowMenu = val
>>>>>>> master
  }
}

export const actions = {
<<<<<<< HEAD
  getHeaderClass ({ commit }) {
    if (this.$route.name === 'index') { return 'header-main-page' }
    if (this.$route.name === 'search' || this.$route.name === 'search-s') { return 'header-search-page' }
    return 'header-inner-page'
  }
}

export const getters = {
  headerClass: s => s.headerClass
=======
}

export const getters = {
  headerClass: s => s.headerClass,
  isBurger: s => s.isBurger,
  isMobile: s => s.isMobile,
  isLogo: s => s.isLogo,
  isShowMenu: s => s.isShowMenu
>>>>>>> master
}
