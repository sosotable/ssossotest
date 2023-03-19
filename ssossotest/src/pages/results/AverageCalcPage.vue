<template>
  <q-page class="column items-center justify-evenly">
    <q-spinner color="primary" size="5em" />
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AverageCalcPage',
  setup() {
    let avgString: string | any;
    return {
      avgString,
    };
  },
  mounted() {
    this.calcAvg().then((response) => {
      this.avgString = response;
      console.log('avgString: ' + this.avgString);

      axios.post('/result/average', this.avgString);

      this.$router.push({
        path: '/result/average',
        query: {
          result: this.$route.query.result,
          avg: encodeURI(this.avgString),
        },
      });
    });
  },

  methods: {
    calcAvg: async function () {
      let averageArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (process.env.DAO_ENDPOINT != undefined) {
        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer1 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 1 + ': ' + response.data[0].avg);
            averageArr[0] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer2 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 2 + ': ' + response.data[0].avg);
            averageArr[1] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer3 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 3 + ': ' + response.data[0].avg);
            averageArr[2] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer4 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 4 + ': ' + response.data[0].avg);
            averageArr[3] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer5 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 5 + ': ' + response.data[0].avg);
            averageArr[4] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer6 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 6 + ': ' + response.data[0].avg);
            averageArr[5] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer7 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 7 + ': ' + response.data[0].avg);
            averageArr[6] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer8 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 8 + ': ' + response.data[0].avg);
            averageArr[7] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer9 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 9 + ': ' + response.data[0].avg);
            averageArr[8] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer10 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 10 + ': ' + response.data[0].avg);
            averageArr[9] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'SELECT',
            columns: 'AVG( answer11 ) AS avg',
            table: 'average_result',
          })
          .then((response) => {
            console.log('average' + 11 + ': ' + response.data[0].avg);
            averageArr[10] = Number(Number(response.data[0].avg).toFixed(2));
          })
          .catch((error) => {
            console.log(error);
          });

        await console.log(averageArr);

        return JSON.stringify(averageArr);
      }
    },
  },
});
</script>
