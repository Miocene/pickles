import PickleList from '@/pages/PickleList'
import PickleShow from '@/pages/PickleShow'
import NotFound from '@/pages/NotFound'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'PickleList', component: PickleList },
    { path: '/pickle/:id', name: 'PickleShow', component: PickleShow, props: true },
    { path: '/:PathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export default createRouter({
    history: createWebHistory(),
    routes
})