import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PublicLayout,
    children:[
      {
        path:"",
        name:"inicio",
        component:() =>  import('../pages/public/HomeView.vue')
      },
      {
        path:"login",
        name:"login",
        component:() =>  import('../pages/public/Login.vue')
      },
      {
        path:"confirmation",
        name:"confirmation",
        component:() =>  import('../pages/public/Confirmation.vue')
      },
      {
        path:"register",
        name:"register",
        component:() =>  import('../pages/public/Register.vue')
      },
      {
        path:"reset",
        name:"reset",
        component:() =>  import('../pages/public/ResetPassword.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    meta:{secure:true},
    component: () => import("../layouts/AdminLayout.vue"),
    children:[
      {
        path:"",
        name:"dash",
        component:() =>  import('../pages/admin/IndexAdmin.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
