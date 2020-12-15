<template>
  <div>
    <b-row align-h="between">
        <b-col cols="4"><b-button variant="outline-success" size="lg" @click="showModal('search', 'Buscar')">Buscar</b-button></b-col>
        <b-col class="text-right" cols="4"><b-button variant="outline-success" size="lg" @click="showModal('save', 'Incluir funcionário')">Incluir funcionário</b-button></b-col>
      </b-row>

    <b-modal ref="my-modal" hide-footer :title="title">
      <div class="d-block text-left">
        <input id="employee-id" type="hidden" v-model="newEmployee.id" />

        <b-form-group label="Nome:" label-for="employee-nome">
          <b-form-input
            class="mt-3"
            id="employee-nome"
            v-model="newEmployee.nome"
            required
            placeholder="Informe o nome do funcionário"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Idade:" label-for="employee-idade">
          <b-form-row>
            <b-col cols="4">
              <b-form-input
                class="mt-2"
                id="employee-idade"
                v-model="newEmployee.idade"
                required
                placeholder="Informe a idade"
              ></b-form-input>
            </b-col>
          </b-form-row>
        </b-form-group>

        <b-form-group label="Cargo:" label-for="employee-cargo">
          <b-form-input
            class="mt-3"
            id="employee-cargo"
            v-model="newEmployee.cargo"
            required
            placeholder="Informe o cargo do funcionário"
          ></b-form-input>
        </b-form-group>
      </div>
      <b-button class="mt-3" variant="outline-success" v-if="mode ==='save'" @click="save">Incluir</b-button>
      <b-button class="mt-3" variant="outline-success" v-else @click="getBy">Buscar</b-button>
      <b-button
        class="mt-3 ml-2"
        variant="outline-danger"
        @click="hideModal"
        >Cancelar</b-button
      >
      <b-button v-if="mode ==='search'" class="mt-3 ml-2" @click="loadEmployees">limpar filtro</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  name: "Modal",
  data() {
    return {
      mode: "save",
      title: "",
      newEmployee: {

      },
    };
  },
  methods: {
     showModal(mode, title) {
       this.mode = mode
       this.title = title
       this.$refs['my-modal'].show()
      },
      hideModal() {
            this.$refs["my-modal"].hide();
            this.reset()
          },
      //limpando o v-model caso haja desistencia de uma ação
      reset() {
        this.newEmployee = {}
      },
      save() {
        axios.post(`${baseApiUrl}/employee`, this.newEmployee)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.hideModal()
            this.loadEmployees()
          })
          .catch(showError)
      },
      loadEmployees(){
        this.$store.commit('loadEmployees')
      },
      getBy() {
        this.$store.commit('getBy', this.newEmployee)
        this.hideModal()
      }
      
  }
};
</script>

<style>
</style>