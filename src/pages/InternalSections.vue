<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <internal-sections-table class="q-ma-sm"></internal-sections-table>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "InternalSections",
  components: {
    InternalSectionsTable: () => import('components/internal-sections/InternalSectionsTable'),
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
