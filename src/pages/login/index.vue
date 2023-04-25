<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useAuthStore } from '@/stores/modules/auth';
import { Modal, Toast } from '@/utils/uniapi/prompt';
import { useRouter } from '@/hooks/router';
import { useRequest } from 'alova';
import { login } from '@/services/api/auth';
import { ThemeEnum } from '@/enums/theme';

const redirect = ref<string | undefined>(undefined);
onLoad((query) => {
    redirect.value = query.redirect ? decodeURIComponent(query.redirect) : undefined;
});
const styles = {
    borderColor: ThemeEnum.PRIMARY_COLOR,
};
const router = useRouter();

const loading = ref(false);
const form = ref<any>(null);
const formData = reactive({
    email: 'uni-app@test.com',
    password: 'Vue3_Ts_Vite',
});
const rules = reactive({
    email: {
        rules: [
            {
                required: true,
                message: '请输入邮箱',
            },
            {
                format: 'email',
                message: '请输入正确的邮箱',
            },
        ],
    },
    password: {
        rules: [
            {
                required: true,
                message: '请输入密码',
            },
        ],
    },
});
const authStore = useAuthStore();
const { send: sendLogin } = useRequest(login, { immediate: false });
const submitForm = () => {
    form.value
        .validate()
        .then((params: any) => {
            console.log('规则', rules);
            console.log('表单数据信息：', params);
            loading.value = true;
            sendLogin(params)
                .then((res) => {
                    Toast('登录成功', { duration: 1500 });
                    authStore.setToken(res.token);
                    setTimeout(() => {
                        if (redirect.value) {
                            router.go(redirect.value!, { replace: true });
                            return;
                        }
                        router.pushTab('/pages/about/index');
                    }, 1500);
                })
                .catch(({ err }) => {
                    console.log('登录失败', err.message);
                    Modal({
                        title: '登录失败',
                        content: err.message,
                        showCancel: false,
                    });
                })
                .finally(() => {
                    loading.value = false;
                });
        })
        .catch((err: any) => {
            console.log('表单错误信息：', err);
        });
};
</script>

<template>
    <view class="container px-6 text-left">
        <view class="header flex flex-col">
            <text class="title text-36 font-300">Login<uni-icons type="person-filled" size="18"></uni-icons></text>
            <text class="subtitle text-28" :class="`text-${ThemeEnum.PRIMARY_COLOR}`">Welcome back , Rohit thakur</text>
        </view>
        <view class="content text-center">
            <image class="logo" w-592 src="@/static/images/login.png" />
            <text class="text-34 font-700" :class="`text-${ThemeEnum.PRIMARY_COLOR}`">Enter Your Mobile Number</text>
            <uni-forms class="mt10" ref="form" :modelValue="formData" :rules="rules">
                <uni-forms-item :labelWidth="0" name="email">
                    <uni-easyinput type="text" :primaryColor="ThemeEnum.PRIMARY_COLOR" :styles="styles" v-model="formData.email" placeholder="请输入邮箱" />
                </uni-forms-item>
                <uni-forms-item :labelWidth="0" name="password">
                    <uni-easyinput
                        type="password"
                        :primaryColor="ThemeEnum.PRIMARY_COLOR"
                        :styles="styles"
                        v-model="formData.password"
                        placeholder="请输入密码"
                    />
                </uni-forms-item>
            </uni-forms>
            <button class="login-tbn mt10 rounded-2.5 bg-#F2796B text-#fff" :loading="loading" @click="submitForm">Login</button>
        </view>
    </view>
</template>

<style lang="scss" scoped></style>
