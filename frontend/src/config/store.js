import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import { baseApiUrl } from "@/global"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        employees: [],
        employeeCount: '',
    },
    mutations: {
        loadEmployees(state) {
            const url = `${baseApiUrl}/employee`;
            axios.get(url).then((res) => {
                state.employeeCount = res.data.count
                state.employees = res.data.data;

            });
        },
        getBy(state, params) {
            function filterName (result) {
                if(params.nome){
                    const FilterName = result.filter((elemento) => elemento.nome === params.nome)
                    return FilterName
                } else {
                  return result
                }
            }
            function filterAge (result) {
                if(params.idade){
                    const filterAge = result.filter((elemento) => elemento.idade === parseInt(params.idade))
                    return filterAge
                } else {
                  return result
                }
            }
            function filterOffice (result) {
                if(params.cargo){
                    const filterOffice = result.filter((elemento) => elemento.cargo === params.cargo)
                    return filterOffice
                } else {
                  return result
                }
            }
            const url = `${baseApiUrl}/filter`;
            console.log(params)
            axios.get(url, params)
            .then((res) => filterName(res.data.data))
            .then((res) => filterAge(res))
            .then((res) => filterOffice(res))
            .then(res => state.employees = res)

    }
}})