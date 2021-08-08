<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Categorías
        <q-btn
          color="positive"
          class="float-right text-capitalize"
          icon="add"
          @click="addCategoryDialog = true"
        />
      </div>
    </q-card-section>
    <div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          popup 
          group=":)"
          expand-separator
          expand-icon-toggle
          switch-toggle-side
          v-for="(category, index) in categories"
          :key="category.id"
        >
          <q-item
            :label="subcategory.name"
            v-for="subcategory in categories[index].subcategories"
            :key="subcategory.id"
          >
            <q-item-section avatar class="q-pl-md">
              <q-icon color="primary" name="category" />
            </q-item-section>

            <q-item-section>
              {{ subcategory.name }}
            </q-item-section>

            <q-item-section side>
              <q-icon color="primary" size="xs" class="pointer" name="edit" @click="editSubcategory(category, subcategory)"/>
            </q-item-section>

            <q-item-section side>
              <q-icon color="primary" size="xs" class="pointer" name="delete" @click="deleteSubcategory(subcategory)" />
            </q-item-section>
          </q-item>

          <q-item clickable @click="addSubcategoryDialog = true; editedItem.categoryId = category.id">

            <q-item-section avatar class="q-pl-md">
              <q-icon  name="add" color="green" />
            </q-item-section>
            <q-item-section>
              Agregar Subcategoría
            </q-item-section>

          </q-item>

          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar icon="category" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section >
              {{category.name}}
            </q-item-section>
            
             <q-item-section side>
              <q-icon name="edit" color="primary" size="xs" class="pointer" @click="editCategory(category)" />
            </q-item-section>

            <q-item-section side>
              <q-icon name="delete" color="primary" size="xs" class="pointer" @click="deleteCategory(category)" />
            </q-item-section>

          </template>
        </q-expansion-item>
      </q-list>
    </div>
    <q-dialog v-model="addCategoryDialog" persistent>
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">{{ formCategoryTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mx-sm">
              <q-input dense v-model="editedItem.name" label="Nombre" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="closeNewCategoryDialog" />
          <q-btn flat :label="formCategoryTitle" @click="saveNewCategory" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addSubcategoryDialog" persistent>
      <q-card style="min-width: 750px">
        <q-card-section>
          <div class="text-h6">{{ formSubcategoryTitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col q-mx-sm">
              <q-input dense v-model="editedItem.name" label="Nombre" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="closeNewSubcategoryDialog" />
          <q-btn flat :label="formSubcategoryTitle" @click="saveNewSubcategory" /> 
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { api } from "../../boot/axios";

export default {
  name: "CategoriesExpansionItem",
  data() {
    return {
      categories: [],
      addCategoryDialog: false,
      addSubcategoryDialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        categoryId: "",
      },
      defaultItem: {
        name: "",
        categoryId: "",
      },
    };
  },
  created() {
    this.getCategories();
  },
  computed: {
    formCategoryTitle() {
      return this.editedIndex === -1 ? "Crear Categoría" : "Editar Categoría";
    },
    formSubcategoryTitle() {
      return this.editedIndex === -1 ? "Crear Subcategoría" : "Editar Subcategoría";
    },
  },
  methods: {
    getCategories() {
      api
        .get("categories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log("error" + e);
        });
    },
    editCategory(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.addCategoryDialog = true;
    },
    editSubcategory(category, subcategory) {
      this.editedIndex = subcategory.id
      this.editedItem = Object.assign({}, subcategory);
      this.addSubcategoryDialog = true;
    },
    deleteCategory(item) {
      const index = this.categories.indexOf(item);
      const id = this.categories[index].id;
      confirm("Estás seguro que querés eliminar esta categoría?") &&
        this.categories.splice(index, 1) &&
        api.delete(`categories/deleteCategory/${id}`).catch((e) => {
          console.log(e.response.data.message);
        });
    },
    deleteSubcategory(item) {

      confirm("Estás seguro que querés eliminar esta subcategoría?") &&
        api.delete(`subcategories/deleteSubcategory/${item.id}`)
        .then(this.getCategories())
        .catch((e) => {
          console.log(e.response.data.message);
        });
    },
    saveNewCategory() {

      if (this.editedIndex > -1) {
        let localIndex = this.editedIndex;
        api
          .put(`categories/editCategory/${this.categories[localIndex].id}`, this.editedItem)
          .then((data) => {
            Object.assign(this.categories[localIndex], {
              id: data.data.id,
              name: data.data.name,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        api
          .post("categories/addCategory", this.editedItem)
          .then((data) => {
            this.categories.push({
              id: data.data.id,
              name: data.data.name,
            });
          })
          .catch((e) => {
            console.log(e.response.data.message);
          });
      }
      this.closeNewCategoryDialog();
    },
    saveNewSubcategory() {

      if (this.editedIndex > -1) {
        api
          .put(`subcategories/editSubcategory/${this.editedIndex}`, this.editedItem)
          .then(this.getCategories())
          .catch((e) => {
            console.log(e);
          });
      } else {
        api
          .post("subcategories/addSubcategory", this.editedItem)
          .then(this.getCategories())
          .catch((e) => {
            console.log(e.response.data.message);
          });
      }
      this.closeNewSubcategoryDialog();
    },
    closeNewCategoryDialog() {
      this.addCategoryDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeNewSubcategoryDialog() {
      this.addSubcategoryDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>