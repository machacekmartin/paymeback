import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/home'
    },
    {
        path: '/tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                component: () => import('@/views/HomeTab.vue')
            },
            {
                path: 'settings',
                component: () => import('@/views/SettingsTab.vue')
            },
            {
                path: 'history',
                component: () => import('@/views/HistoryTab.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router