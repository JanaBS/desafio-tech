<template>
  <div>
    <Header />
    <b-container class="mt-5">
        <Modal/>
        <Table />    
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Table from "./components/Table";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
//import axios from "axios";
//import { baseApiUrl } from "@/global";

export default {
  name: "App",
  components: { Header, Table, Modal, Footer },
  data: function () {
    return {
      
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
