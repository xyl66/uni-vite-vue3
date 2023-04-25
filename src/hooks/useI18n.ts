/* eslint-disable no-unused-vars */
import { CLIENT_TYPES } from '@/enums/platformEnum';
import { LOCALE, i18n } from '@/locale';
import { judgeClient } from '@/utils/platform';

type I18nGlobalTranslation = {
    (key: string): string;
    (key: string, locale: string): string;
    (key: string, locale: string, list: unknown[]): string;
    (key: string, locale: string, named: Record<string, unknown>): string;
    (key: string, list: unknown[]): string;
    (key: string, named: Record<string, unknown>): string;
};

type I18nTranslationRestParameters = [string, any];

function getKey(namespace: string | undefined, key: string) {
    if (!namespace) {
        return key;
    }
    if (key.startsWith(namespace)) {
        return key;
    }
    return `${namespace}.${key}`;
}

export function useI18n(namespace?: string): {
    t: I18nGlobalTranslation;
    setLocale: (local: LOCALE) => void;
} {
    const normalFn = {
        t: (key: string) => {
            return getKey(namespace, key);
        },
    };

    if (!i18n) {
        return normalFn;
    }

    const { t, ...methods } = i18n.global;

    const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
        if (!key) return '';
        if (!key.includes('.') && !namespace) return key;
        return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
    };

    const setLocale = (local: LOCALE) => {
        if (judgeClient(CLIENT_TYPES.ANDROID)) {
            uni.showModal({
                content: t('index.language-change-confirm'),
                success: (res) => {
                    if (res.confirm) {
                        uni.setLocale(local);
                    }
                },
            });
        } else {
            uni.setLocale(local);
            i18n.global.locale = local;
        }
        return local;
    };
    return {
        ...methods,
        t: tFn,
        setLocale,
    };
}
