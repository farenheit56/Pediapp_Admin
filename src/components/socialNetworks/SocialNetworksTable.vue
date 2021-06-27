<template>
  <q-card class="table-bg no-shadow">
    <q-card-section>
      <div class="text-h6">
        Redes Sociales
      </div>
    </q-card-section>
    <q-separator color="white"/>
    <q-card-section class="q-pa-none">
      <q-table class="table-bg" :data="socialNetworks" :columns="columns" :filter="filter" :pagination="pagination">
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn color= positive class="float-right text-capitalize" icon="add" @click="addSocialNetworkDialog = true"/>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense @click="editSocialNetwork(props.row)"/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="deleteSocialNetwork(props.row)"/>
          </q-td>
        </template>
        <template v-slot:body-cell-Icon="props">
          <q-td :props="props">
            <q-img v-if="props.row.icon_url" :src="`http://localhost:3000/images/` + props.row.icon_url" height="auto" width="50px" :ratio="1"/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="addSocialNetworkDialog">
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">{{formTitle}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.name" label="Nombre"/></div>
          </div>
          <div class="row q-mt-md">
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.url" label="Link"/></div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.file"
              label="Icono"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.icon_url !== null" name="close" @click.stop="editedItem.icon_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="close" />
          <q-btn flat :label="formTitle" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { api } from '../../boot/axios'

export default {
  name: "SocialNetworksTable",
  created(){
    this.getSocialNetworks();
  },
  data() {
    return {
      socialNetworks: [],
      filter: '',
      columns: [
        {name: 'Id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {name: 'Name', label: 'Nombre', field: 'name', sortable: true, align: 'left'},
        {name: 'Url', label: 'Link', field: 'url', sortable: true, align: 'left'},
        {name: 'Icon', label: 'Imagen', field: 'icon_url', sortable: true, align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      pagination: {
        rowsPerPage: 5,
      },
      addSocialNetworkDialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        url: '',
        file: null,
        icon_url: '',       
      },
      defaultItem: {
        name: '',
        url: '',
        file: null,
        icon_url: '',       
      },
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Crear Red Social' : 'Editar Red Social'
      },
    },
  methods: {
    getSocialNetworks() {
      api.get('socialNetworks')
      .then((response) => {
        this.socialNetworks = response.data
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    editSocialNetwork(item) {
        this.editedIndex = this.socialNetworks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.addSocialNetworkDialog = true
    },
    deleteSocialNetwork(item) {
      const index = this.socialNetworks.indexOf(item)
      const id = this.socialNetworks[index].id
      confirm('Estás seguro que querés eliminar esta red social?') && this.socialNetworks.splice(index, 1) &&
      api.delete(`socialNetworks/deleteSocialNetwork/${id}`)
      .catch( e => {
        console.log(e.response)
      })
    },
    close () {
        this.addSocialNetworkDialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },

    save () {
      let formData = new FormData();
      formData.set('name',this.editedItem.name)
      formData.set('url',this.editedItem.url)
      formData.append('file',this.editedItem.file)

      if (this.editedIndex > -1) {
        let localIndex = this.editedIndex
        api.put(`socialNetworks/editSocialNetwork/${this.socialNetworks[localIndex].id}`, formData)
        .then(data => {
          Object.assign(this.socialNetworks[localIndex], {
            id: data.data.id,
            name: data.data.name,
            url: data.data.url,
            file: null,
            icon_url: data.data.icon_url,  
          })
        })
        .catch(e => {
          console.log(e);
        })
      } else {
        api.post('socialNetworks/addSocialNetwork', formData)
        .then(data => {
          this.socialNetworks.push({
            id: data.data.id,
            name: data.data.name,
            url: data.data.url,
            file: null,
            icon_url: data.data.icon_url,  
          })
        })
        .catch( e => {
          console.log(e.response.data.errors.message)
        })
      }
      this.close()
    },
    onRejected() {
      this.$q.notify({
        type: 'negative',
        message: `Archivo no permitido`
      })
    }
  }
}
</script>

<style>

</style>
