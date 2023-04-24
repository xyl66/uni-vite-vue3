<script lang="ts" setup>
import BasicButton from '@/components/BasicButton/index.vue';
import AppProvider from '@/components/AppProvider/inedx.vue';
import { useRouter } from '@/hooks/router';
import { useI18n } from '@/hooks/useI18n';
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const { t } = useI18n();

const title = ref();
const router = useRouter();
const jumpList1 = () => {
    router.push('/pagesA/list/test1/index?key=words&page=1&limit=15');
};
onShow(() => {
    console.log('onShow');
    title.value = t('index.demo');
});
</script>

<template>
    <AppProvider>
        <view class="container"> {{ title }} </view>
        <view class="_u_center">
            <BasicButton @click="jumpList1">List1 → </BasicButton>
        </view>
        <uni-badge :text="20" type="primary" size="normal" />
        <image src="https://img.yzcdn.cn/vant/logo.png" mode="scaleToFill" />
        <button :disabled="false" :loading="true" open-type="" hover-class="button-hover" @click="jumpList1"></button>
    </AppProvider>
</template>

<style lang="scss" scoped>
.container {
    padding: 128rpx 0;
    text-align: center;
}
</style>
