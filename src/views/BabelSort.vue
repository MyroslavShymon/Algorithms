<template>
  <div class="wrapper">
    <h2>{{ this.sort }} sort</h2>
    <form class="form" action="" @submit.prevent="chosingSort">
      <md-field>
        <label>Type here surname!</label>
        <md-input v-model="surname" required></md-input>
        <span class="md-error">There is an error</span>
        <span class="md-helper-text">Surname</span>
      </md-field>
      <md-field>
        <label>Type here group!</label>
        <md-input v-model="group" required></md-input>
        <span class="md-error">There is an error</span>
        <span class="md-helper-text">Group</span>
      </md-field>
      <md-field>
        <label for="sort">Sort</label>
        <md-select v-model="sort" name="sort" id="sort">
          <md-option value="Bubble">Bubble sort</md-option>
          <md-option value="Shake">Shake sort</md-option>
        </md-select>
      </md-field>
      <md-switch v-model="boolean" class="md-primary"
        >Surname or Group</md-switch
      >
      <md-button class="md-raised md-primary" type="submit">Sort</md-button>
    </form>
    <ul>
      <li v-for="(person, index) of objects" :person="person" :key="index">
        {{ index + 1 }} {{ person.surname }} {{ person.group }}
      </li>
    </ul>
  </div>
</template>

<script>
class Person {
  constructor(surname, group) {
    this.surname = surname;
    this.group = group;
  }
}
let arr = [];
export default {
  name: "ErrorsMessages",
  data() {
    return {
      surname: "",
      group: "",
      objects: [],
      boolean: false,
      sort: "",
    };
  },
  methods: {
    chosingSort() {
      if (this.sort == "Bubble") {
        this.babelSort();
      } else {
        this.shakeSort();
      }
    },
    babelSort() {
      console.log(this.movie);
      arr.push(new Person(this.surname, this.group));
      //console.log("arr", arr);
      if (this.boolean === false) {
        let swap, temp;

        do {
          swap = false;
          for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index].surname > arr[index + 1].surname) {
              temp = arr[index].surname;
              arr[index].surname = arr[index + 1].surname;
              arr[index + 1].surname = temp;
              arr[index].group = arr[index + 1].group;
              arr[index + 1].group = temp;
              swap = true;
            }
          }
        } while (swap == true);
      } else {
        let swap, temp;

        do {
          swap = false;
          for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index].group > arr[index + 1].group) {
              temp = arr[index].group;
              arr[index].surname = arr[index + 1].surname;
              arr[index + 1].surname = temp;
              arr[index].group = arr[index + 1].group;
              arr[index + 1].group = temp;
              swap = true;
            }
          }
        } while (swap == true);
      }
      this.objects = arr;
      //console.log("arr", arr);
      //console.log("objects", this.objects);
      //console.log("persons", this.objects);
      //messageClass();
      this.surname = "";
      this.group = "";
    },
    shakeSort() {
      arr.push(new Person(this.surname, this.group));
      //console.log("arr", arr);
      if (this.boolean === false) {
        let left = 0; //начало массива
        let right = arr.length - 1; //конец массива
        do {
          for (let i = left; i < right; i++) {
            if (arr[i].surname > arr[i + 1].surname) {
              [arr[i].surname, arr[i + 1].surname] = [
                arr[i + 1].surname,
                arr[i].surname,
              ];
              [arr[i].group, arr[i + 1].group] = [
                arr[i + 1].group,
                arr[i].group,
              ];
            }
          }
          // console.log('arr :', arr);
          right--;
          for (let i = right; left < i; i--) {
            if (arr[i].surname < arr[i - 1].surname) {
              [arr[i].surname, arr[i - 1]].surname = [
                arr[i - 1].surname,
                arr[i],
              ].surname;
              [arr[i].group, arr[i - 1]].group = [
                arr[i - 1].group,
                arr[i],
              ].group;
            }
          }
          // console.log('arr :', arr);
          left++;
        } while (left < right);
      } else {
        let left = 0; //начало массива
        let right = arr.length - 1; //конец массива
        do {
          for (let i = left; i < right; i++) {
            if (arr[i].group > arr[i + 1].group) {
              [arr[i].surname, arr[i + 1].surname] = [
                arr[i + 1].surname,
                arr[i].surname,
              ];
              [arr[i].group, arr[i + 1].group] = [
                arr[i + 1].group,
                arr[i].group,
              ];
            }
          }
          // console.log('arr :', arr);
          right--;
          for (let i = right; left < i; i--) {
            if (arr[i].group < arr[i - 1].group) {
              [arr[i].surname, arr[i - 1]].surname = [
                arr[i - 1].surname,
                arr[i],
              ].surname;
              [arr[i].group, arr[i - 1]].group = [
                arr[i - 1].group,
                arr[i],
              ].group;
            }
          }
          // console.log('arr :', arr);
          left++;
        } while (left < right);
      }
      this.objects = arr;
      //console.log("arr", arr);
      //console.log("objects", this.objects);
      //console.log("persons", this.objects);
      //messageClass();
      this.surname = "";
      this.group = "";
    },
  },
  // computed: {
  //   messageClass() {
  //     return {
  //       "md-invalid": !this.surname.length || !this.group.length,
  //     };
  //   },
  // },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 35%;
}
ul {
  padding: 0;
}
li {
  list-style-type: none;
}
</style>
