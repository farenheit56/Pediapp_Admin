
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue'), meta: {requireAuth: true} },
      { path: '/categorias', component: () => import('pages/Categories.vue'), meta: {requireAuth: true}  },
      { path: '/productos', component: () => import('pages/Products.vue'), meta: {requireAuth: true}  },
      { path: '/inicio', component: () => import('pages/Home.vue'), meta: {requireAuth: true}  },
      { path: '/secciones-internas', component: () => import('pages/InternalSections.vue'), meta: {requireAuth: true} },
      { path: '/contacto', component: () => import('src/pages/Contact.vue'), meta: {requireAuth: true}  },
      { path: '/redes-sociales', component: () => import('pages/SocialNetworks.vue'), meta: {requireAuth: true}  }
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
