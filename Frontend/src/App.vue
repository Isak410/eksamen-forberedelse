<script>

import { ref, onMounted } from 'vue';
import axios from 'axios';

  export default {
    setup() {
        const inputData = ref('')

        const insertdata = async(userdata) => {
          const result = await axios.post(`http://localhost:8080/insertdata`,{userdata:userdata})
          console.log(result)
        }

        const submitData = () => {
          insertdata(inputData.value)
        }

        return {
          submitData,
          inputData
        };
    },
};
</script>

<template>
  <h1>Vue adøaldkøla</h1>
  <input v-model="inputData">
  <button @click="submitData">Submit</button>
</template>