
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/categories', component: () => import('pages/Categories.vue') },
      { path: '/products', component: () => import('pages/Products.vue') },
      { path: '/internalSections', component: () => import('pages/InternalSections.vue') },
      { path: '/contact', component: () => import('src/pages/Contact.vue') },
      { path: '/socialNetworks', component: () => import('pages/SocialNetworks.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
