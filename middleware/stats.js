import axios from 'axios'

export default function ({ isHMR, app, store, route, params, error, redirect,req }) {
  if (isHMR) return;
  store.commit('SET_SHOW', store.state.showAddDoc);
  store.commit('SET_DOC_DETAIL', store.state.showDocDetail);
}
