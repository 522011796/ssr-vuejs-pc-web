export const state = (lang) => ({
  locales: ['en', 'zh'],
  locale: 'zh',
  token:'success'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_SHOW(state, value) {
    state.showAddDoc = value;
  },
  SET_DOC_DETAIL(state, value) {
    state.showDocDetail = value;
  },
}
