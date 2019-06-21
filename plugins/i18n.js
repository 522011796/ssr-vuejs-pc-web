import Vue from 'vue'
import VueI18n from 'vue-i18n'
import utils from "../utils/utils";

Vue.use(VueI18n)

export default ({app, store, req}) => {
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch

    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: store.state.locale,
        messages: {
            'en': require('~/locales/lang/en.json'),
            'zh': require('~/locales/lang/zh.json')
        }
    })

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`
        }

        return `/${app.i18n.locale}/${link}`
    }
}
