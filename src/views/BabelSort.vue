<template>
  <div class="wrapper">
    <div class="data-wrapper">
      <Chart :spead="avarageSpeads" v-if="isHidden"></Chart>
      <div>
        <h2>{{ chosingSortText }}</h2>
        <form class="form" action="" @submit.prevent="add">
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
            <input type="text" v-model="sort" style="display: none" />
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
          <textarea name="" id="" cols="30" rows="10" v-model="test"></textarea>

          <div>
            <md-button class="md-raised md-primary" v-on:click="testAdd"
              >Test</md-button
            >
            <md-button class="md-raised md-primary" v-on:click="chosingSort"
              >Sort</md-button
            >
            <md-button class="md-raised md-primary" v-on:click="save"
              >Save</md-button
            >
            <md-button class="md-raised md-primary" v-on:click="read"
              >Read</md-button
            >
            <md-button class="md-raised md-primary" type="submit"
              >Add</md-button
            >
            <md-button
              class="md-raised md-primary"
              v-on:click="isHidden = !isHidden"
              >Show graphik</md-button
            >
          </div>
        </form>
      </div>
    </div>

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
import Chart from "@/components/Chart";
import { typeOfSorts } from "@/constants/";
//import setSpead from "@/mixins/setSpead.mixin.js";
class Person {
  constructor(surname, group) {
    this.surname = surname;
    this.group = group;
  }
}
let arr = [];
export default {
  data() {
    return {
      show: true,
      surname: "",
      group: "",
      objects: [],
      boolean: false,
      sort: "",
      speads: [[], [], [], []],
      avarageSpeads: [0, 0, 0, 0],
      isHidden: false,
      test: "",
    };
  },
  components: {
    Chart,
  },
  computed: {
    chosingSortText() {
      let result;
      switch (this.sort) {
        case "Bubble":
          result = typeOfSorts[0];
          break;
        case "Shake":
          result = typeOfSorts[1];
          break;
        case "Selection":
          result = typeOfSorts[2];
          break;
        case "Insertion":
          result = typeOfSorts[3];
          break;
        default:
          result = "Sort";
          break;
      }
      return result;
    },
  },
  methods: {
    testAdd() {
      this.objects.length = 0;
      arr.length = 0;
      for (const word of this.test.split(" ")) {
        arr.push(new Person(word, word + "_group"));
        this.objects = arr;
      }
    },
    add() {
      arr.push(new Person(this.surname, this.group));
      this.objects = arr;
    },
    save() {
      const parsed = JSON.stringify(this.objects);
      localStorage.setItem("objects", parsed);
    },
    read() {
      arr = [...JSON.parse(localStorage.getItem("objects"))];
      this.objects = arr;
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
      let time = performance.now();
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
      time = performance.now() - time;
      console.log("Время выполнения = ", time);
      //this.avarageSpeads[0] = setSpead(this.speads, time, 0);

      this.speads[0].push(time);
      let sum = this.speads[0].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[0].length;
      this.avarageSpeads[0] = avarageTime;
      console.log(this.avarageSpeads);
      this.surname = "";
      this.group = "";
    },
    shakeSort() {
      let time = performance.now();
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
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[1].push(time);
      let sum = this.speads[1].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[1].length;
      this.avarageSpeads[1] = avarageTime;

      this.surname = "";
      this.group = "";
    },
    selectionSort() {
      let n = arr.length;
      let time = performance.now();
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
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[2].push(time);
      let sum = this.speads[2].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[2].length;
      this.avarageSpeads[2] = avarageTime;

      this.surname = "";
      this.group = "";
    },
    insertionSort() {
      let time = performance.now();
      if (this.boolean === false) {
        for (let counter = 1; counter < arr.length; counter++) {
          let temp = arr[counter]; // инициализируем временную переменную текущим значением элемента массива
          let item = counter - 1; // запоминаем индекс предыдущего элемента массива
          while (item >= 0 && temp.surname < arr[item].surname) {
            // пока индекс не равен 0 и предыдущий элемент массива больше текущего
            arr[item + 1] = arr[item]; // перестановка элементов массива
            arr[item] = temp;
            item--;
          }
        }
      } else {
        for (let counter = 1; counter < arr.length; counter++) {
          let temp = arr[counter]; // инициализируем временную переменную текущим значением элемента массива
          let item = counter - 1; // запоминаем индекс предыдущего элемента массива
          while (item >= 0 && temp.group < arr[item].group) {
            // пока индекс не равен 0 и предыдущий элемент массива больше текущего
            arr[item + 1] = arr[item]; // перестановка элементов массива
            arr[item] = temp;
            item--;
          }
        }
      }
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[3].push(time);
      let sum = this.speads[3].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[3].length;
      this.avarageSpeads[3] = avarageTime;

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
  width: 100%;
}
td {
  padding: 5px 13px;
  border: 1px solid #448aff;
}
.data-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
}
h2 {
  text-align: center;
}
textarea {
  width: 100%;
}
</style>
