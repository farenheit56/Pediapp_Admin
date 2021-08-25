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

        <q-btn
          flat
          dense
          round
          label="Cerrar Sesión"
          @click="cerrarSesion()" v-if="estaActivo"
        />
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
import { mapActions, mapGetters } from "vuex";

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
    link: '/internalSections'
  },
  {
    title: 'Redes Sociales',
    icon: 'share',
    link: '/socialNetworks'
  },
  {
    title: 'Datos de Contacto',
    icon: 'contact_page',
    link: '/contact'
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
  },
  computed:{
  ...mapGetters(['estaActivo'])
  },
  methods:{
  ...mapActions(['cerrarSesion', 'leerToken'])
  },
}
</script>
