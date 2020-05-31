export default function ({ route, store }) {
  switch (route.name) {
    case 'search': case 'search-s' :
      store.commit('header/setHeaderClass', 'header-search-page header-search')
      break
    case 'index' :
      store.commit('header/setHeaderClass', 'header-main-page header-index')
      store.commit('header/isBurger', false)
      break
    case 'category' :
      store.commit('header/setHeaderClass', 'header-inner-page header-category')
      store.commit('header/isBurger', false)
      break
    case 'category-slug': case 'page-slug' :
      store.commit('header/setHeaderClass', 'header-inner-page header-single')
      store.commit('header/isBurger', true)
      break
  }
}
