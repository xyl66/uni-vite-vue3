import { App } from 'vue';
import { I18nOptions, createI18n } from 'vue-i18n';
import en from './en.json';
import zhHans from './zh-Hans.json';
import zhHant from './zh-Hant.json';
import ja from './ja.json';
const messages = {
    en,
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
    ja,
};

export let i18n: ReturnType<typeof createI18n>;

function createI18nOptions(): I18nOptions {
    return {
        locale: uni.getLocale(), // 获取已设置的语言
        messages,
    };
}
export function setupI18n(app: App<Element>) {
    const options = createI18nOptions();
    i18n = createI18n(options);
    app.use(i18n);
}
