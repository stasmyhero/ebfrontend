export const strict = false

export const state = () => ({
  headerClass: 'header-main-page',
  isBurger: false,
  isMobile: false,
  isLogo: false,
  isShowMenu: false
})

export const mutations = {
  setHeaderClass (state, headerClass) {
    state.headerClass = headerClass
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
  }
}

export const actions = {
}

export const getters = {
  headerClass: s => s.headerClass,
  isBurger: s => s.isBurger,
  isMobile: s => s.isMobile,
  isLogo: s => s.isLogo,
  isShowMenu: s => s.isShowMenu
}
