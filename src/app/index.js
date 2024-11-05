import './index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useUserStore } from '@/entities/user'
import router from './providers/router'
import { PrimeVue, PrimeVueConfig, ToastService } from '@/shared/ui/primeVueConfig';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('userStore', useUserStore);
app.use(PrimeVue, PrimeVueConfig);
app.use(ToastService);

export default app