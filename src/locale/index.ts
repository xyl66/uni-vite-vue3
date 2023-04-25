import { App } from 'vue';
import { I18nOptions, createI18n } from 'vue-i18n';
import en from './en.json';
import zhHans from './zh-Hans.json';
import zhHant from './zh-Hant.json';
import ja from './ja.json';
export enum LOCALE {
    EN = 'en',
    ZH_HANS = 'zh-Hans',
    ZH_HANT = 'zh-Hant',
    JA = 'ja',
}
const messages: Record<LOCALE, Record<string, string>> = {
    [LOCALE.EN]: en,
    [LOCALE.ZH_HANS]: zhHans,
    [LOCALE.ZH_HANT]: zhHant,
    [LOCALE.JA]: ja,
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
