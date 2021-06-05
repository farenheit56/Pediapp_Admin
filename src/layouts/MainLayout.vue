<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Panel de Administración
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <q-list>
        <DrawerOptions
          v-for="link in DrawerOptions"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DrawerOptions from 'components/DrawerOptions.vue'

const linksData = [
  {
    title: 'Categorías y Subcategorías',
    icon: 'category',
    link: '/categories'
  },
  {
    title: 'Productos',
    icon: 'production_quantity_limits',
    link: '/products'
  },
  {
    title: 'Secciones',
    icon: 'view_quilt',
    link: 'https://quasar.dev'
  },
  {
    title: 'Footer',
    icon: 'low_priority',
    link: 'https://quasar.dev'
  },
  {
    title: 'Redes Sociales',
    icon: 'share',
    link: 'https://quasar.dev'
  },
  {
    title: 'Datos de Contacto',
    icon: 'contact_page',
    link: 'https://quasar.dev'
  },
];

export default {
  name: 'MainLayout',
  components: { DrawerOptions },
  data () {
    return {
      leftDrawerOpen: false,
      DrawerOptions: linksData
    }
  }
}
</script>
