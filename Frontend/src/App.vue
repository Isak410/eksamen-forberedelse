<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const inputData = ref('');
    const storagedata = ref([]);

    const insertdata = async (userdata) => {
      try {
        const result = await axios.post('http://localhost:8080/insertdata', { userdata: userdata });
        console.log(result);
        if (result.data.success) {
          const newdata = await getData();
          storagedata.value = newdata;
        }
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    };

    const submitData = () => {
      insertdata(inputData.value);
      inputData.value = '';  // Clear input after submission
    };

    const getData = async () => {
      try {
        const result = await axios.get('http://localhost:8080/getdata');
        console.log(result);
        return result.data.storagedata;
      } catch (error) {
        console.error('Error getting data:', error);
        return [];
      }
    };

    onMounted(async () => {
      storagedata.value = await getData();
    });

    return {
      submitData,
      inputData,
      storagedata
    };
  },
};
</script>

<template>
  <h1>Vue adøaldkøla</h1>
  <input v-model="inputData">
  <button @click="submitData">Submit</button>
  <ul>
    <li v-for="(element, index) in storagedata" :key="index">{{ element }}</li>
  </ul>
</template>
