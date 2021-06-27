<template>
  <q-card class="table-bg no-shadow">
    <q-card-section>
      <div class="text-h6">Productos</div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        class="table-bg"
        :data="products"
        :columns="columns"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:top-left>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <q-btn
            color="positive"
            class="float-right text-capitalize"
            icon="add"
            @click="addProductDialog = true"
          />
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              icon="share"
              size="sm"
              flat
              dense
              @click="relateProduct(props.row)"
            />
            <q-btn
              icon="edit"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="editProduct(props.row)"
            />
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="deleteProduct(props.row)"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-Image="props">
          <q-td :props="props">
            <q-img
              v-if="props.row.image_url"
              :src="`http://localhost:3000/images/` + props.row.image_url"
              height="auto"
              width="100px"
              :ratio="1"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="addProductDialog">
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">{{ formTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mx-sm">
              <q-input dense v-model="editedItem.name" label="Nombre" />
            </div>
            <div class="col q-mx-sm">
              <q-input dense v-model="editedItem.price" label="Precio" />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col q-mx-sm">
              <q-input
                dense
                v-model="editedItem.description"
                clearable
                autogrow
                label="Descripción"
                type="textarea"
              />
            </div>
          </div>
          <div class="row q-mt-md justify-center">
            <div class="col-6 q-mx-sm">
              <q-file
                rounded
                outlined
                type="file"
                bottom-slots
                v-model="editedItem.file"
                label="Foto"
                counter
                max-file-size="2097152"
                max-files="1"
                accept=".jpg, image/*"
                @rejected="onRejected"
              >
                <template v-slot:before>
                  <q-icon name="attachment" />
                </template>

                <template v-slot:append>
                  <q-icon
                    v-if="editedItem.image_url !== null"
                    name="close"
                    @click.stop="editedItem.image_url = null"
                    class="cursor-pointer"
                  />
                  <q-icon name="search" @click.stop />
                </template>

                <template v-slot:hint> Tamaño máximo 2MB </template>
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

    <q-dialog v-model="relateProductDialog">
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">Relacionar con Subcategoría</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center">
            <q-option-group
            v-model="selectedSubcategories"
            :options="subcategories"
            color="primary"
            type="checkbox"
          />
          </div>
          
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="close" />
          <q-btn flat label="Relacionar Subcategorias" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { api } from "../../boot/axios";

export default {
  name: "ProductsTable",
  created() {
    this.getProducts();
    this.getSubcategories();
  },
  data() {
    return {
      products: [],
      subcategories: [],
      selectedSubcategories: [],
      filter: "",
      columns: [
        { name: "Id", label: "ID", field: "id", sortable: true, align: "left" },
        {
          name: "Name",
          label: "Nombre",
          field: "name",
          sortable: true,
          align: "left",
        },
        {
          name: "Price",
          label: "Precio",
          field: "price",
          sortable: true,
          align: "left",
        },
        {
          name: "Description",
          label: "Descripción",
          field: "description",
          sortable: true,
          align: "left",
        },
        {
          name: "Image",
          label: "Imagen",
          field: "image_url",
          sortable: true,
          align: "left",
        },
        {
          name: "Action",
          label: "",
          field: "Action",
          sortable: true,
          align: "center",
        },
      ],
      pagination: {
        rowsPerPage: 5,
      },
      addProductDialog: false,
      relateProductDialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        price: "",
        description: "",
        file: null,
        image_url: "",
      },
      defaultItem: {
        name: "",
        price: "",
        description: "",
        file: null,
        image_url: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Crear Producto" : "Editar Producto";
    },
  },
  methods: {
    getProducts() {
      api
        .get("products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },
    getSubcategories() {
      api
        .get("subcategories")
        .then((response) => {
            this.subcategories = response.data;
            this.subcategories = this.subcategories.map(subcategory => {
              subcategory['label'] = subcategory['name']
              subcategory['value'] = subcategory['id']
              delete subcategory['name']
              delete subcategory['id']
              return subcategory
            })
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },
    editProduct(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.addProductDialog = true;
    },
    deleteProduct(item) {
      const index = this.products.indexOf(item);
      const id = this.products[index].id;
      confirm("Estás seguro que querés eliminar este producto?") &&
        this.products.splice(index, 1) &&
        api.delete(`products/deleteProduct/${id}`).catch((e) => {
          console.log(e.response);
        });
    },
    relateProduct(item) {
      this.relateProductDialog = true;
    },
    close() {
      this.addProductDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let formData = new FormData();
      formData.set("name", this.editedItem.name);
      formData.set("price", this.editedItem.price);
      formData.set("description", this.editedItem.description);
      formData.append("file", this.editedItem.file);

      if (this.editedIndex > -1) {
        let localIndex = this.editedIndex;
        api
          .put(`products/editProduct/${this.products[localIndex].id}`, formData)
          .then((data) => {
            Object.assign(this.products[localIndex], {
              id: data.data.id,
              name: data.data.name,
              price: data.data.price,
              description: data.data.description,
              file: null,
              image_url: data.data.image_url,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        api
          .post("products/addProduct", formData)
          .then((data) => {
            this.products.push({
              id: data.data.id,
              name: data.data.name,
              price: data.data.price,
              description: data.data.description,
              file: null,
              image_url: data.data.image_url,
            });
          })
          .catch((e) => {
            console.log(e.response.data.errors.message);
          });
      }
      this.close();
    },
    onRejected() {
      this.$q.notify({
        type: "negative",
        message: `Archivo no permitido`,
      });
    },
  },
};
</script>

<style>

</style>
