<script lang="ts" setup>
import BasicButton from '@/components/BasicButton/index.vue';
import AppProvider from '@/components/AppProvider/inedx.vue';
import { useRouter } from '@/hooks/router';

const styles = {
    borderColor: '#F72525',
};
const router = useRouter();
const jumpList1 = () => {
    router.push('/pagesA/list/test1/index?key=words&page=1&limit=15');
};
</script>

<template>
    <AppProvider>
        <view class="container px-6 text-left">
            <view class="header flex flex-col">
                <text class="title text-36 font-300">Login<uni-icons type="person-filled" size="18"></uni-icons></text>
                <text class="subtitle text-28 text-#5B5B5B">Welcome back , Rohit thakur</text>
            </view>
            <view class="content text-center">
                <image class="logo" w-592 src="@/static/images/login.png" />
                <text class="text-34 font-700 text-#F2796B">Enter Your Mobile Number</text>
                <uni-easyinput
                    class="mt10"
                    primaryColor="#F2796B"
                    v-model="value"
                    :styles="styles"
                    focus
                    placeholder="请输入内容"
                    @input="input"
                ></uni-easyinput>
            </view>
        </view>
    </AppProvider>
</template>

<style lang="scss" scoped>
.container {
}
</style>
