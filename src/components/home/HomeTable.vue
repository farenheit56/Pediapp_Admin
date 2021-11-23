<template>
  <q-card class="no-shadow">
    <div class="row justify-between">
      <div class="col-1 text-h6">HOME</div>
      <div class="col-1"><div><q-btn color="amber" glossy label="Editar" @click="editHome(home[0])"/></div></div>
    </div>
    <div class="row" style="padding:24px 0px 8px 16px">Titulo: &nbsp;{{home[0].title}}</div>
    <div class="row" style="padding-left: 16px">Descripción: &nbsp;{{home[0].description}}</div>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Slider</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].slider_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Imagen Soporte de Texto</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].support_image_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Banner Principal 1</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].banner_image_1_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Banner Principal 2</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].banner_image_2_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Banner Destacado 1</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].body_banner_image_1_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Banner Destacado 2</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].body_banner_image_2_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Información Extra 1</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].extra_info_image_1_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Información Extra 2</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].extra_info_image_2_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-card flat  style="max-width: 550px">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="q-mt-sm q-mb-xs">Información Extra 3</div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`http://api.pediapp.com.ar/images/` + home[0].extra_info_image_3_url"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-dialog v-model="homeDialog">
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
                  Tamaño máximo 2MB - 950 x 950 px.
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
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.banner_image_1"
              label="Banner 1"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.banner_image_1_url !== null" name="close" @click.stop="editedItem.banner_image_1_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.banner_image_2"
              label="Banner 2"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.banner_image_2_url !== null" name="close" @click.stop="editedItem.banner_image_2_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.body_banner_image_1"
              label="Banner Destacado 1"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.body_banner_image_1_url !== null" name="close" @click.stop="editedItem.body_banner_image_1_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.body_banner_image_2"
              label="Banner Destacado 2"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.body_banner_image_2_url !== null" name="close" @click.stop="editedItem.body_banner_image_2_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.extra_info_image_1"
              label="Información Extra 1"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.extra_info_image_1_url !== null" name="close" @click.stop="editedItem.extra_info_image_1_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.extra_info_image_2"
              label="Información Extra 2"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.extra_info_image_2_url !== null" name="close" @click.stop="editedItem.extra_info_image_2_url = null" class="cursor-pointer" />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint>
                  Tamaño máximo 2MB - 950 x 950 px.
                </template>
              </q-file>
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file 
              rounded outlined type="file" 
              bottom-slots
              v-model="editedItem.extra_info_image_3"
              label="Información Extra 3"
              counter
              max-file-size="2097152"
              max-files="1"
              accept=".jpg, image/*"
              @rejected="onRejected">
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon v-if="editedItem.extra_info_image_3_url !== null" name="close" @click.stop="editedItem.extra_info_image_3_url = null" class="cursor-pointer" />
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
  name: "HomeTable",
  created(){
    this.getHome();
  },
  data() {
    return {
      home: [],
      filter: '',
      columns: [
        {name: 'Id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {name: 'Title', label: 'Titulo', field: 'title', sortable: true, align: 'left'},
        {name: 'Slider-Image', label: 'Slider', field: 'slider_url', sortable: true, align: 'left'},
        {name: 'Description', label: 'Descripción', field: 'description', sortable: true, align: 'left'},
        {name: 'Support-Image', label: 'Imagen Soporte Texto', field: 'support_image_url', sortable: true, align: 'left'},
        {name: 'Banner-Image-1', label: 'Banner 1', field: 'banner_image_1_url', sortable: true, align: 'left'},
        {name: 'Banner-Image-2', label: 'Banner 2', field: 'banner_image_2_url', sortable: true, align: 'left'},
        {name: 'Body-Banner-Image-1', label: 'Banner Destacado 1', field: 'body_banner_image_1_url', sortable: true, align: 'left'},
        {name: 'Body-Banner-Image-2', label: 'Banner Destacado 2', field: 'body_banner_image_2_url', sortable: true, align: 'left'},
        {name: 'Extra-Info-Image-1', label: 'Información Extra 1', field: 'extra_info_image_1_url', sortable: true, align: 'left'},
        {name: 'Extra-Info-Image-2', label: 'Información Extra 2', field: 'extra_info_image_2_url', sortable: true, align: 'left'},
        {name: 'Extra-Info-Image-3', label: 'Información Extra 3', field: 'extra_info_image_3_url', sortable: true, align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      pagination: {
        rowsPerPage: 0,
      },
      homeDialog: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        slider_image: null,
        description: '', 
        support_image: null,
        slider_url: '',    
        support_image_url: '', 
        banner_image_1: null,
        banner_image_1_url: '',
        banner_image_2: null,
        banner_image_2_url: '',
        body_banner_image_1: null,
        body_banner_image_1_url: '',
        body_banner_image_2: null,
        body_banner_image_2_url: '',
        extra_info_image_1: null,
        extra_info_image_1_url: '',
        extra_info_image_2: null,
        extra_info_image_2_url: '',
        extra_info_image_3: null,
        extra_info_image_3_url: '',   
      },
      defaultItem: {
        title: '',
        slider_image: null,
        description: '', 
        support_image: null,
        slider_url: '',    
        support_image_url: '', 
        banner_image_1: null,
        banner_image_1_url: '',
        banner_image_2: null,
        banner_image_2_url: '',
        body_banner_image_1: null,
        body_banner_image_1_url: '',
        body_banner_image_2: null,
        body_banner_image_2_url: '',
        extra_info_image_1: null,
        extra_info_image_1_url: '',
        extra_info_image_2: null,
        extra_info_image_2_url: '',
        extra_info_image_3: null,
        extra_info_image_3_url: '',         
      },
    }
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Crear Home' : 'Editar Home'
      },
      isHomeCreated() {
        return this.home.length !== 0
      },
    },
  methods: {
    getHome() {
      api.get('home')
      .then((response) => {
        this.home = response.data
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    editHome (item) {
        this.editedIndex = this.home.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.homeDialog = true
    },
    close () {
        this.homeDialog = false
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
      formData.append('banner_1_image',this.editedItem.banner_image_1)
      formData.append('banner_2_image',this.editedItem.banner_image_2)
      formData.append('body_banner_image_1',this.editedItem.body_banner_image_1)
      formData.append('body_banner_image_2',this.editedItem.body_banner_image_2)
      formData.append('extra_info_image_1',this.editedItem.extra_info_image_1)
      formData.append('extra_info_image_2',this.editedItem.extra_info_image_2)
      formData.append('extra_info_image_3',this.editedItem.extra_info_image_3)

      if (this.editedIndex > -1) {
        let localIndex = this.editedIndex
        api.put(`home/editHome/${this.home[localIndex].id}`, formData)
        .then(data => {
          Object.assign(this.home[localIndex], {
            id: data.data.id,
            title: data.data.title,
            description: data.data.description, 
            slider_image: null,
            support_image: null,
            slider_url: data.data.slider_url,  
            support_image_url: data.data.support_image_url,  
            banner_image_1: null,
            banner_image_1_url: data.data.banner_image_1_url,
            banner_image_2: null,
            banner_image_2_url: data.data.banner_image_2_url,
            body_banner_image_1: null,
            body_banner_image_1_url: data.data.body_banner_image_1_url,
            body_banner_image_2: null,
            body_banner_image_2_url: data.data.body_banner_image_2_url,
            extra_info_image_1: null,
            extra_info_image_1_url: data.data.extra_info_image_1_url,
            extra_info_image_2: null,
            extra_info_image_2_url: data.data.extra_info_image_2_url,
            extra_info_image_3: null,
            extra_info_image_3_url: data.data.extra_info_image_3_url, 
          })
        })
        .catch(e => {
          console.log(e);
        })
      } else {
        api.post('home/addHome', formData)
        .then(data => {
          this.sections.push({
            id: data.data.id,
            title: data.data.title,
            description: data.data.description, 
            slider_image: null,
            support_image: null,
            slider_url: data.data.slider_url,  
            support_image_url: data.data.support_image_url, 
            banner_image_1: null,
            banner_image_1_url: data.data.banner_image_1_url,
            banner_image_2: null,
            banner_image_2_url: data.data.banner_image_2_url,
            body_banner_image_1: null,
            body_banner_image_1_url: data.data.body_banner_image_1_url,
            body_banner_image_2: null,
            body_banner_image_2_url: data.data.body_banner_image_2_url,
            extra_info_image_1: null,
            extra_info_image_1_url: data.data.extra_info_image_1_url,
            extra_info_image_2: null,
            extra_info_image_2_url: data.data.extra_info_image_2_url,
            extra_info_image_3: null,
            extra_info_image_3_url: data.data.extra_info_image_3_url,  
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
