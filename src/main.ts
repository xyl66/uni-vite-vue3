import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/stores';
import 'uno.css';
import { setupI18n } from '@/locale';

export function createApp() {
    const app = createSSRApp(App);

    // Configure store
    setupStore(app);

    setupI18n(app);

    return {
        app,
    };
}
