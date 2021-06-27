<template>
  <q-page class="q-pa-sm">
    <div class="row justify-evenly">
      <social-network-table class="q-ma-sm"></social-network-table>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "SocialNetworks",
  components: {
    SocialNetworkTable: () => import('components/socialNetworks/SocialNetworksTable'),
  },
}
</script>

<style>
  .table-bg {
    background-color: #ffffff;
  }
</style>
