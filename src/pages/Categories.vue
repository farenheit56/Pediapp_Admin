<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <categories-expansion-item class="q-ma-sm"></categories-expansion-item>
      
    </div>
    <div>
      
    </div>
  </q-page>
</template>

<script>

export default {
  name: "Categories",
  components: {
    CategoriesExpansionItem: () => import('components/categories/CategoriesExpansionItem')
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
