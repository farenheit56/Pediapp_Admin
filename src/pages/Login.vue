<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Panel de Administración
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.username"
                label="Usuario"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="user.pass"
                label="Contraseña"
                lazy-rules

              />

              <div>
                <q-btn label="Ingresar" @click="login" type="button" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
          <div class="q-ml-md" v-if="mensaje !== ''">
            <p>{{mensaje}}</p>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { api } from '../boot/axios'

    export default {
        data() {
            return {
                user: {username: "", pass: ""},
                mensaje: ''
            }
        },
        methods: {
          ...mapMutations(['obtenerUsuario']),
          ...mapActions(['guardarUsuario', 'leerToken', 'cerrarSesion']),
          login() {
            api.post('users/login', this.user)
            .then((response) => {
              const token = response.data.token
              this.guardarUsuario(token)
              this.$router.push({ path: '/' })
            })
            .catch((e)=>{
              console.log('error' + e);
              this.mensaje = e.response.data.mensaje;
            })
          },
        },
    }
</script>

<style>

  .bg-image {
   background-image: linear-gradient(135deg, #363636 0%, #26A69A 100%);
  }
</style>
