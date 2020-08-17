import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import registration from '../components/registration'
import list from '../components/list'
import casesList from '../components/cases-list'

Vue.use(Router);

let router=new Router({
    routes: [
    {
        path: '/',
        name: 'sign',
        component: registration
    },
    {
        path: '/list',
        name: 'lists',
        component: list,
        beforeEnter(to,from,next) {
            store.state.userId ? next() : next('/');
        }
    },
    {
        path: '/tasks',
        name: 'cases',
        component: casesList,
        props: true,
        beforeEnter(to,from,next) {
            store.state.userId ? next() : next('/');
        }
    }
    ]   
})

export default router;