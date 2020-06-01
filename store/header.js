export const state = () => ({
  headerClass: 'header-main-page',
  isBurger: false,
  isShowMenu: true,
  isMobile: false,
  isLogo: false
})

export const mutations = {
  setHeaderClass (state, headerClass) {
    state.headerClass = headerClass
  },
  isBurger (state, val) {
    state.isBurger = val
  },
  isShowMenu (state, val) {
    state.isShowMenu = val
  },
  isMobile (state, val) {
    state.isMobile = val
  },
  isLogo (state, val) {
    state.isLogo = val
  }
}

// export const actions = {
// }

export const getters = {
  headerClass: s => s.headerClass,
  isBurger: s => s.isBurger,
  isMobile: s => s.isMobile,
  isLogo: s => s.isLogo
}
