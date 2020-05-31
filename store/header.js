export const state = () => ({
  headerClass: 'header-main-page'
})

export const mutations = {
  setHeaderClass (state, headerClass) {
    state.headerClass = headerClass
  }
}

// export const actions = {
// }

export const getters = {
  headerClass: s => s.headerClass
}
