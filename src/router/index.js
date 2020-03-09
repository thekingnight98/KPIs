import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/newTemplate',
        name: 'newTemplate',
        component: () =>
            import ('../views/NewTemplate.vue')
    },
    {
        path: '/assign',
        name: 'assign',
        component: () =>
            import ('../views/NewAssign.vue')
    },
    {
        path: '/assessment',
        name: 'assessment',
        component: () =>
            import ('../views/Assessment.vue')
    },
    {
        path: '/edit/:id',
        name: 'EditTemplate',
        component: () =>
            import ('../views/EditPage.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router