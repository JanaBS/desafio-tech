<template>
  <div>
    <b-row class="mt-5" v-if="employeeCount === 0">
      <b-col>
        <b-alert class="text-center pt-4 pb-4" show variant="dark"
          >Não há funcionários cadastrados</b-alert
        >
      </b-col>
    </b-row>
    <div v-else class="mt-5 mb-5">
      <b-table striped hover :items="employees" :fields="fields" style="border-bottom: 1px solid grey">
        <template slot="cell(actions)" slot-scope="data">
          <b-button
            variant="primary"
            @click="loadEmployee(data.item, 'edit')"
            class="mr-2"
            size="sm"
          >
            <b-icon-pencil font-scale="1"></b-icon-pencil>
          </b-button>
          <b-button
            variant="danger"
            @click="loadEmployee(data.item, 'remove')"
            size="sm"
          >
            <b-icon-trash font-scale="1"></b-icon-trash>
          </b-button>
        </template>
      </b-table>
    </div>

<!-- modal de edição -->
    <b-modal ref="edit" hide-footer title="Alterar funcionário">
      <div class="d-block text-left mb-5">
        <input id="employee-id" type="hidden" v-model="employee.id" />

        <b-form-group label="Nome:" label-for="employee-nome">
          <b-form-input
            class="mt-3"
            id="employee-nome"
            v-model="employee.nome"
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
                v-model="employee.idade"
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
            v-model="employee.cargo"
            required
            placeholder="Informe o cargo do funcionário"
          ></b-form-input>
        </b-form-group>
      </div>
      <b-button variant="outline-success" @click="editEmployee"
        >Salvar
      </b-button>
      <b-button class="ml-2" variant="outline-danger" @click="hideModal('edit')"
        >Cancelar</b-button
      >
    </b-modal>
<!-- modal de exclusão -->
    <b-modal ref="remove" hide-footer title="Desejar excluir funcionário?">
      <b-button variant="outline-success" @click="remove">Excluir </b-button>
      <b-button class="ml-2" variant="outline-danger" @click="hideModal('remove')"
        >Cancelar</b-button
      >
    </b-modal>
  </div>
</template>



<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
export default {
  props: ["item"],
  computed: {
    employees() {
      return this.$store.state.employees
    },
    employeeCount(){
      return this.$store.state.employeeCount
    }
  },
  name: "Table",
  data() {
    return {
      mode: "",
      employee: {},
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "idade", label: "Idade", sortable: true },
        { key: "cargo", label: "Cargo", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },

  methods: {
    editEmployee() {
      const id = this.employee.id;
      axios
        .put(`${baseApiUrl}/employee/${id}`, this.employee)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.hideModal('edit')
          this.$store.commit('loadEmployees')
        })
        .catch(showError);
    },
    remove() {
      const id = this.employee.id;
      axios.delete(`${baseApiUrl}/employee/${id}`, this.employee)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.hideModal('remove')
          this.$store.commit('loadEmployees')        })
        .catch(showError);
    },

    loadEmployee(employee, mode) {
      this.mode = mode;
      this.employee = { ...employee };
      this.showModal(mode);
    },
    showModal(tipo) {
      this.$refs[tipo].show();
    },
    hideModal(tipo) {
      this.$refs[tipo].hide();
      this.reset();
    },
    reset() {
      this.employee = {};
    },
  },

  mounted() {
    this.$store.commit('loadEmployees')
    
  },
};

    // getEmployees() {
    //   const url = `${baseApiUrl}/employee`;
    //   axios.get(url).then((res) => {
    //     this.employeeCount = res.data.count
    //     this.employees = res.data.data;

    //   });
    // },
</script>

<style>
</style>

