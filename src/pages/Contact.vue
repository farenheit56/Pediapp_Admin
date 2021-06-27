<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <contact-table class="q-ma-sm"></contact-table>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "Contact",
  components: {
    ContactTable: () => import('components/contact/ContactTable'),
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
