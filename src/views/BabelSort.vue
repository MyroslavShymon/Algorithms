<template>
  <div class="wrapper">
    <h2>{{ chosingSortText }}</h2>
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
        <input type="text" v-model="sort" required style="display: none" />
        <md-select v-model="sort" name="sort" id="sort">
          <md-option value="Bubble">Bubble sort</md-option>
          <md-option value="Shake">Shake sort</md-option>
          <md-option value="Selection">Selection sort</md-option>
          <md-option value="Insertion">Insertion sort</md-option>
        </md-select>
        <span class="md-error">The Sort is required</span>
      </md-field>
      <md-switch v-model="boolean" class="md-primary"
        >Surname or Group</md-switch
      >
      <div>
        <md-button class="md-raised md-primary" type="submit">Sort</md-button>
        <md-button class="md-raised md-primary" v-on:click="save"
          >Save</md-button
        >
      </div>
    </form>
    <!-- <div id="app-2">
      <span v-bind:title="message">
        Наведи на меня курсор на пару секунд, чтобы увидеть динамически
        связанное значение title!
      </span>
      <p>Сообщение задом наперёд: «{{ reversedMessage }}»</p>
    </div> -->
    <table>
      <thead>
        <tr>
          <td>№</td>
          <td>Surname</td>
          <td>Group</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) of objects" :person="person" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ person.surname }}</td>
          <td>{{ person.group }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// const fs = require("fs");
// fs.writeFile("hello.txt", "Hello мир!", function(error) {
//   if (error) throw error; // если возникла ошибка
//   console.log("Асинхронная запись файла завершена. Содержимое файла:");
//   let data = fs.readFileSync("hello.txt", "utf8");
//   console.log(data); // выводим считанные данные
// });
class Person {
  constructor(surname, group) {
    this.surname = surname;
    this.group = group;
  }
}
// let arr = [];
let arr = [...JSON.parse(localStorage.getItem("objects"))];
export default {
  data() {
    return {
      surname: "",
      group: "",
      objects: [],
      boolean: false,
      sort: "",
    };
  },
  computed: {
    chosingSortText() {
      let result;
      switch (this.sort) {
        case "Bubble":
          result = "Bubble sort";
          break;
        case "Shake":
          result = "Shake sort";
          break;
        case "Selection":
          result = "Selection sort";
          break;
        case "Insertion":
          result = "Insertion sort";
          break;
        default:
          result = "Sort";
          break;
      }
      return result;
    },
  },
  methods: {
    save() {
      const parsed = JSON.stringify(this.objects);
      localStorage.setItem("objects", parsed);
    },
    chosingSort() {
      switch (this.sort) {
        case "Bubble":
          this.babelSort();
          break;
        case "Shake":
          this.shakeSort();
          break;
        case "Selection":
          this.selectionSort();
          break;
        case "Insertion":
          this.insertionSort();
          break;
        default:
          break;
      }
    },
    babelSort() {
      arr.push(new Person(this.surname, this.group));
      //console.log("arr", arr);
      if (this.boolean === false) {
        let swap, temp;
        do {
          swap = false;
          for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index].surname > arr[index + 1].surname) {
              temp = arr[index];
              arr[index] = arr[index + 1];
              arr[index + 1] = temp;
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
              temp = arr[index];
              arr[index] = arr[index + 1];
              arr[index + 1] = temp;
              swap = true;
            }
          }
        } while (swap == true);
      }
      this.objects = arr;
      this.surname = "";
      this.group = "";
    },
    shakeSort() {
      arr.push(new Person(this.surname, this.group));
      if (this.boolean === false) {
        let left = 0;
        let right = arr.length - 1;
        do {
          for (let i = left; i < right; i++) {
            if (arr[i].surname > arr[i + 1].surname) {
              [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
          }
          right--;
          for (let i = right; left < i; i--) {
            if (arr[i].surname < arr[i - 1].surname) {
              [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            }
          }
          left++;
        } while (left < right);
      } else {
        let left = 0;
        let right = arr.length - 1;
        do {
          for (let i = left; i < right; i++) {
            if (arr[i].group > arr[i + 1].group) {
              [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
          }
          right--;
          for (let i = right; left < i; i--) {
            if (arr[i].group < arr[i - 1].group) {
              [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            }
          }
          left++;
        } while (left < right);
      }
      this.objects = arr;
      this.surname = "";
      this.group = "";
    },
    selectionSort() {
      arr.push(new Person(this.surname, this.group));
      let n = arr.length;
      if (this.boolean === false) {
        for (let i = 0; i < n; i++) {
          // Finding the smallest number in the subarray
          let min = i;
          for (let j = i + 1; j < n; j++) {
            if (arr[j].surname < arr[min].surname) {
              min = j;
            }
          }
          if (min != i) {
            // Swapping the elements
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
          }
        }
      } else {
        for (let i = 0; i < n; i++) {
          // Finding the smallest number in the subarray
          let min = i;
          for (let j = i + 1; j < n; j++) {
            if (arr[j].group < arr[min].group) {
              min = j;
            }
          }
          if (min != i) {
            // Swapping the elements
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
          }
        }
      }

      this.objects = arr;
      this.surname = "";
      this.group = "";
    },
    insertionSort() {
      arr.push(new Person(this.surname, this.group));
      if (this.boolean === false) {
        for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
          let indexMin = i;
          for (let j = i + 1; j < l; j++) {
            if (arr[indexMin].surname > arr[j].surname) {
              indexMin = j;
            }
          }
          if (indexMin !== i) {
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
          }
        }
      } else {
        for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
          let indexMin = i;
          for (let j = i + 1; j < l; j++) {
            if (arr[indexMin].group > arr[j].group) {
              indexMin = j;
            }
          }
          if (indexMin !== i) {
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
          }
        }
      }

      this.objects = arr;
      this.surname = "";
      this.group = "";
    },
  },
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
td {
  padding: 5px 13px;
  border: 1px solid #448aff;
}
</style>
