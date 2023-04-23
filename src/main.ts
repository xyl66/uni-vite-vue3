import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/stores';
import 'uno.css';

export function createApp() {
    const app = createSSRApp(App);

    // Configure store
    setupStore(app);

    return {
        app,
    };
}
