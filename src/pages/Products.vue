<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <products-table class="q-ma-sm"></products-table>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "Categories",
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
