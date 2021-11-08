<template>
  <q-card class="table-bg no-shadow">
    <q-card-section>
      <div class="text-h6">
        Secciones Internas
      </div>
    </q-card-section>
    <q-separator color="white"/>
    <q-card-section class="q-pa-none">
      <q-table class="table-bg" :data="sections" :columns="columns" :filter="filter" :pagination="pagination">
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn color= positive class="float-right text-capitalize" icon="add" @click="sectionsDialog = true"/>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense @click="editSection(props.row)"/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="deleteSection(props.row)"/>
          </q-td>
        </template>
        <template v-slot:body-cell-Slider-Image="props">
          <q-td :props="props">
            <q-img v-if="props.row.slider_url" :src="`https://admin.pediapp.com.ar/images/` + props.row.slider_url" height="auto" width="100px" :ratio="1"/>
          </q-td>
        </template>
        <template v-slot:body-cell-Support-Image="props">
          <q-td :props="props">
            <q-img v-if="props.row.slider_url" :src="`https://admin.pediapp.com.ar/images/` + props.row.support_image_url" height="auto" width="100px" :ratio="1"/>
          </q-td>
        </template>
        <template v-slot:body-cell-Description="props">
          <q-td :props="props">
            {{props.row.description.substr(0, 25) + '&hellip;'}}
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="sectionsDialog">
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">{{formTitle}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.title" label="Titulo"/></div>
          </div>
          <div class="row q-mt-md">
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.description" clearable autogrow label="Descripción" type="textarea"/></div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.slider_image"
              label="Slider"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.slider_url !== null" name="close" @click.stop="editedItem.slider_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 1900 x 320 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.support_image"
              label="Imagen soporte"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.support_image_url !== null" name="close" @click.stop="editedItem.support_image_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
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
  name: "InternalSectionsTable",
  created(){
    this.getSections();
  },
  data() {
    return {
      sections: [],
      filter: '',
      columns: [
        {name: 'Id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {name: 'Title', label: 'Titulo', field: 'title', sortable: true, align: 'left'},
        {name: 'Slider-Image', label: 'Slider', field: 'slider_url', sortable: true, align: 'left'},
        {name: 'Description', label: 'Descripción', field: 'description', sortable: true, align: 'left'},
        {name: 'Support-Image', label: 'Imagen soporte', field: 'support_image_url', sortable: true, align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      pagination: {
        rowsPerPage: 5,
      },
      sectionsDialog: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        slider_image: null,
        description: '', 
        support_image: null,
        slider_url: '',    
        support_image_url: '',   
      },
      defaultItem: {
        title: '',
        slider_image: null,
        description: '', 
        support_image: null,
        slider_url: '',    
        support_image_url: '',       
      },
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Crear Sección' : 'Editar Sección'
      },
    },
  methods: {
    getSections() {
      api.get('internalSections')
      .then((response) => {
        this.sections = response.data
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    editSection (item) {
        this.editedIndex = this.sections.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.sectionsDialog = true
    },
    deleteSection (item) {
      const index = this.sections.indexOf(item)
      const id = this.sections[index].id
      confirm('Estás seguro que querés eliminar esta sección?') && this.sections.splice(index, 1) &&
      api.delete(`internalSections/deleteSection/${id}`)
      .catch( e => {
        console.log(e.response)
      })
    },
    close () {
        this.sectionsDialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },

    save () {
      let formData = new FormData();
      formData.set('title',this.editedItem.title)
      formData.set('description',this.editedItem.description)
      formData.append('slider_image',this.editedItem.slider_image)
      formData.append('support_image',this.editedItem.support_image)

      if (this.editedIndex > -1) {
        let localIndex = this.editedIndex
        api.put(`internalSections/editSection/${this.sections[localIndex].id}`, formData)
        .then(data => {
          Object.assign(this.sections[localIndex], {
            id: data.data.id,
            title: data.data.title,
            description: data.data.description, 
            slider_image: null,
            support_image: null,
            slider_url: data.data.slider_url,  
            support_image_url: data.data.support_image_url,  
          })
        })
        .catch(e => {
          console.log(e);
        })
      } else {
        api.post('internalSections/addSection', formData)
        .then(data => {
          this.sections.push({
            id: data.data.id,
            title: data.data.title,
            description: data.data.description, 
            slider_image: null,
            support_image: null,
            slider_url: data.data.slider_url,  
            support_image_url: data.data.support_image_url,  
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
