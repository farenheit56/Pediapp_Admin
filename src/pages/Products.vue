<template>
  <q-page class="q-pa-sm">
      <products-table class="q-ma-sm"></products-table>
  </q-page>
</template>

<script>

export default {
  name: "Products",
  components: {
    ProductsTable: () => import('components/products/ProductsTable'),
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
