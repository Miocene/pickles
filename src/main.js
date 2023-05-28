import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

// Global components
import ComponentButton from '@/components/ComponentButton'

createApp(App)
.use(createPinia())
.use(router)
.component( 'ComponentButton', ComponentButton )
.mount('#app')
