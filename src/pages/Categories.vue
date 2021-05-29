<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <categories-table class="q-ma-sm"></categories-table>
      <subcategories-table class="q-ma-sm"></subcategories-table>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "Categories",
  components: {
    CategoriesTable: () => import('components/categories/CategoriesTable'),
    SubcategoriesTable: () => import('components/categories/SubcategoriesTable'),
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
