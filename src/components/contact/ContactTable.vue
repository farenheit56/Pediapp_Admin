<template>
  <q-card class="table-bg no-shadow">
    <q-card-section>
      <div class="text-h6">
        Contacto
      </div>
    </q-card-section>
    <q-separator color="white"/>
    <q-card-section class="q-pa-none">
      <q-table class="table-bg" :data="contact" :columns="columns" :filter="filter" :pagination="pagination" hide-bottom>
        <template v-slot:top-right v-if="!isContactCreated">
          <q-btn color= positive class="float-right text-capitalize" icon="add" @click="addContactDialog = true"/>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="text-amber-9" flat dense @click="editContact(props.row)"/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="addContactDialog">
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">{{formTitle}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.name" label="Nombre"/></div>
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.phone" label="Teléfono"/></div>
          </div>
          <div class="row q-mt-md">
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.address" label="Dirección"/></div>
            <div class="col q-mx-sm"><q-input dense v-model="editedItem.email" label="Email"/></div>
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
  name: "ContactTable",
  created(){
    this.getContactData();
  },
  data() {
    return {
      contact: [],
      filter: '',
      columns: [
        {name: 'Name', label: 'Nombre del Comercio', field: 'name', sortable: true, align: 'left'},
        {name: 'Phone', label: 'Teléfono', field: 'phone', sortable: true, align: 'left'},
        {name: 'Address', label: 'Dirección', field: 'address', sortable: true, align: 'left'},
        {name: 'Email', label: 'Email', field: 'email', sortable: true, align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      pagination: {
        rowsPerPage: 0,
      },
      addContactDialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        phone: '',
        address: '', 
        email: '',
      },
      defaultItem: {
        name: '',
        phone: '',
        address: '',  
        email: '',
      },
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Crear Contacto' : 'Editar Contacto'
      },
      isContactCreated() {
        return this.contact.length !== 0
      },
    },
  methods: {
    getContactData() {
      api.get('contact')
      .then((response) => {
        this.contact = response.data
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    editContact (item) {
        this.editedIndex = this.contact.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.addContactDialog = true
    },
    deleteContact (item) {
      const index = this.contact.indexOf(item)
      const id = this.contact[index].id
      confirm('Estás seguro que querés eliminar este contacto?') && this.contact.splice(index, 1) &&
      api.delete(`contact/deleteContact/${id}`)
      .catch( e => {
        console.log(e.response)
      })
    },
    close () {
        this.addContactDialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    },

    save () {

      if (this.editedIndex > -1) {
        let localIndex = this.editedIndex
        api.put(`contact/editContact/${this.contact[localIndex].id}`, this.editedItem)
        .then(data => {
          Object.assign(this.contact[localIndex], {
            id: data.data.id,
            name: data.data.name,
            phone: data.data.phone,
            address: data.data.address,
            email: data.data.email, 
          })
        })
        .catch(e => {
          console.log(e);
        })
      } else {
        api.post('contact/addContact', this.editedItem)
        .then(data => {
          this.contact.push({
            id: data.data.id,
            name: data.data.name,
            phone: data.data.phone,
            address: data.data.address,  
            email: data.data.email,
          })
        })
        .catch( e => {
          console.log(e.response.data.errors.message)
        })
      }
      this.close()
    },
  }
}
</script>

<style>

</style>
