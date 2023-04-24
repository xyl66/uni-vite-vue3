<script setup lang="ts">
import { ref } from 'vue';
import BasicButton from '@/components/BasicButton/index.vue';
import AppProvider from '@/components/AppProvider/inedx.vue';
import { useRouter } from '@/hooks/router';
import Iconify from '@/components/Iconify/index.vue';
import { getEnvValue } from '@/utils/env';
import { useI18n } from '@/hooks/useI18n';
import { computed } from 'vue';
import { i18n } from '@/locale';
import { onLoad } from '@dcloudio/uni-app';

const { t } = useI18n();
const appTitle = getEnvValue<string>('VITE_APP_TITLE');

const title = ref(appTitle);

const systemInfo = uni.getSystemInfoSync();
const isAndroid = systemInfo.platform.toLowerCase() === 'android';

const applicationLocale = ref();
const systemLocale = ref();
const locales = computed(() => [
    {
        text: t('locale.auto'),
        value: 'auto',
    },
    {
        text: t('locale.en'),
        value: 'en',
    },
    {
        text: t('locale.zh-hans'),
        value: 'zh-Hans',
    },
    {
        text: t('locale.zh-hant'),
        value: 'zh-Hant',
    },
    {
        text: t('locale.ja'),
        value: 'ja',
    },
]);
const router = useRouter();
const handleGetStarted = () => {
    router.pushTab('/pages/demo/index');
    // router.push('/pages/log/index?id=4345&title=log');
};
const onLocaleChange = (e) => {
    if (isAndroid) {
        uni.showModal({
            content: t('index.language-change-confirm'),
            success: (res) => {
                if (res.confirm) {
                    uni.setLocale(e.code);
                }
            },
        });
    } else {
        uni.setLocale(e);
        i18n.global.locale = e;
        applicationLocale.value = e;
    }
};
onLoad(() => {
    applicationLocale.value = uni.getLocale();
    systemLocale.value = systemInfo.language;
    // uni.onLocaleChange((e) => {
    //     console.log('监听');
    //     applicationLocale.value = e.locale;
    // });
});
</script>
<template>
    <AppProvider>
        <view class="flex flex-col px-4 justify-center">
            <image class="logo self-center" src="/static/svg/LOGO.svg" />
            <view class="my-4">
                <view class="text-area">
                    <text class="">{{ title }}</text>
                </view>
                <uni-section :title="$t('index.application-language')" type="line">
                    <text class="">{{ applicationLocale }}</text>
                </uni-section>
                <uni-section :title="$t('index.system-language')" type="line">
                    <text class="v">{{ systemLocale }}</text>
                </uni-section>
                <uni-section :title="$t('index.language')" type="line">
                    <uni-data-select v-model="applicationLocale" :localdata="locales" @change="onLocaleChange"></uni-data-select>
                </uni-section>
            </view>

            <view class="text-center">
                <BasicButton @click="handleGetStarted">Get Started → </BasicButton>
                <view class="_u_text-red">uno css</view>
                <Iconify icon="i-ph-anchor-simple-thin" size="65" />
                <Iconify icon="i-system-uicons-book-text" />
                <Iconify icon="i-system-uicons-battery-full" size="65" />
                <Iconify icon="i-system-uicons-box-add" :size="65" />
                <Iconify icon="i-system-uicons-bell-snooze" color="red" :size="65" />
            </view>
        </view>
    </AppProvider>
</template>
<style lang="scss">
.logo {
    height: 200rpx;
    width: 200rpx;
}
</style>
