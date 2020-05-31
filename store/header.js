export const state = () => ({
  headerClass: 'header-main-page',
  isBurger: false,
  isShowMenu: true
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
  }
}

// export const actions = {
// }

export const getters = {
  headerClass: s => s.headerClass,
  isBurger: s => s.isBurger

}
