<template>
  <q-card class="table-bg no-shadow">
    <q-card-section>
      <div class="text-h6">
        Categorías
        <q-btn color= positive class="float-right text-capitalize" icon="add"/>
      </div>
    </q-card-section>
    <q-separator color="white"/>
    <q-card-section class="q-pa-none">
      <q-table class="table-bg" :data="categories" :columns="columns">
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from '../../boot/axios'

export default {
  name: "CategoriesTable",
  data() {
    return {
      categories: [],
      columns: [
        {name: 'Id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {name: 'Name', label: 'Nombre', field: 'name', sortable: true, align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
    }
  },
  created(){
    this.getCategories();
  },
  methods: {
    getCategories(){
      api.get('categories')
      .then((response) => {
        this.categories = response.data
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }
  }
}
</script>

<style>

</style>
