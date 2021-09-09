<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <home-table class="q-ma-sm"></home-table>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "Home",
  components: {
    HomeTable: () => import('components/home/HomeTable'),
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
