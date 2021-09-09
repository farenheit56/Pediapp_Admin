
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue'), meta: {requireAuth: true} },
      { path: '/categories', component: () => import('pages/Categories.vue'), meta: {requireAuth: true}  },
      { path: '/products', component: () => import('pages/Products.vue'), meta: {requireAuth: true}  },
      { path: '/home', component: () => import('pages/Home.vue'), meta: {requireAuth: true}  },
      { path: '/internalSections', component: () => import('pages/InternalSections.vue'), meta: {requireAuth: true} },
      { path: '/contact', component: () => import('src/pages/Contact.vue'), meta: {requireAuth: true}  },
      { path: '/socialNetworks', component: () => import('pages/SocialNetworks.vue'), meta: {requireAuth: true}  }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
