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
              <md-option value="Shell">Shell sort</md-option>
              <md-option value="Quick">Quick sort</md-option>
              <md-option value="Pyramidal">Pyramidal sort</md-option>
              <md-option value="Default">Default sort</md-option>
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
      speads: [[], [], [], [], [], [], [], []],
      avarageSpeads: [0, 0, 0, 0, 0, 0, 0, 0],
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
        case "Shell":
          result = typeOfSorts[4];
          break;
        case "Quick":
          result = typeOfSorts[5];
          break;
        case "Pyramidal":
          result = typeOfSorts[6];
          break;
        case "Default":
          result = typeOfSorts[7];
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
        case "Shell":
          this.shellSort();
          break;
        case "Quick":
          this.quickSort();
          break;
        case "Pyramidal":
          this.pyramidalSort();
          break;
        case "Default":
          this.defaultSort();
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
    shellSort() {
      let time = performance.now();
      if (this.boolean === false) {
        let len = arr.length;
        let gapSize = Math.floor(len / 2);

        while (gapSize > 0) {
          for (let i = gapSize; i < len; i++) {
            let temp = arr[i];
            let j = i;

            while (j >= gapSize && arr[j - gapSize].surname > temp.surname) {
              arr[j] = arr[j - gapSize];
              j -= gapSize;
            }
            arr[j] = temp;
          }
          gapSize = Math.floor(gapSize / 2);
        }
      } else {
        let len = arr.length;
        let gapSize = Math.floor(len / 2);

        while (gapSize > 0) {
          for (let i = gapSize; i < len; i++) {
            let temp = arr[i];
            let j = i;

            while (j >= gapSize && arr[j - gapSize].surname > temp.surname) {
              arr[j] = arr[j - gapSize];
              j -= gapSize;
            }
            arr[j] = temp;
          }
          gapSize = Math.floor(gapSize / 2);
        }
      }
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[4].push(time);
      let sum = this.speads[4].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[4].length;
      this.avarageSpeads[4] = avarageTime;

      this.surname = "";
      this.group = "";
    },
    partition(arr, start, end) {
      // Taking the last element as the pivot
      const pivotValue = arr[end];
      let pivotIndex = start;
      if (this.boolean === false) {
        for (let i = start; i < end; i++) {
          if (arr[i].surname < pivotValue.surname) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
          }
        }
      } else {
        for (let i = start; i < end; i++) {
          if (arr[i].group < pivotValue.group) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
          }
        }
      }

      // Putting the pivot value in the middle
      [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
      return pivotIndex;
    },
    quickSort() {
      let time = performance.now();
      // Creating an array that we'll use as a stack, using the push() and pop() functions
      let stack = [];
      let end, start, pivotIndex;

      // Adding the entire initial array as an "unsorted subarray"
      stack.push(0);
      stack.push(arr.length - 1);

      // There isn't an explicit peek() function
      // The loop repeats as long as we have unsorted subarrays
      while (stack[stack.length - 1] >= 0) {
        // Extracting the top unsorted subarray
        end = stack.pop();
        start = stack.pop();

        pivotIndex = this.partition(arr, start, end);

        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start) {
          stack.push(start);
          stack.push(pivotIndex - 1);
        }

        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end) {
          stack.push(pivotIndex + 1);
          stack.push(end);
        }
      }
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[5].push(time);
      let sum = this.speads[5].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[5].length;
      this.avarageSpeads[5] = avarageTime;

      this.surname = "";
      this.group = "";
    },
    pyramidalSort() {
      let time = performance.now();
      let sh = 0,
        b;

      if (this.boolean === false) {
        sort("surname");
      } else {
        sort("group");
      }
      // Смещение
      function sort(sortBy) {
        do {
          b = false;
          for (let i = 0; i < arr.length; i++) {
            if (i * 2 + 2 + sh < arr.length) {
              if (
                arr[i + sh][sortBy] > /*<*/ arr[i * 2 + 1 + sh][sortBy] ||
                arr[i + sh][sortBy] > /*<*/ arr[i * 2 + 2 + sh][sortBy]
              ) {
                if (
                  arr[i * 2 + 1 + sh][sortBy] <
                  /*>*/ arr[i * 2 + 2 + sh][sortBy]
                ) {
                  [arr[i + sh], arr[i * 2 + 1 + sh]] = [
                    arr[i * 2 + 1 + sh],
                    arr[i + sh],
                  ];
                  b = true;
                } else if (
                  arr[i * 2 + 2 + sh][sortBy] <
                  /*>*/ arr[i * 2 + 1 + sh][sortBy]
                ) {
                  [arr[i + sh], arr[i * 2 + 2 + sh]] = [
                    arr[i * 2 + 2 + sh],
                    arr[i + sh],
                  ];
                  b = true;
                }
              }
              // Дополнительная проверка для последних двух элементов;
              // с её помощью можно отсортировать пирамиду
              // состоящую всего лишь из трёх элементов
              if (
                arr[i * 2 + 2 + sh][sortBy] < /*>*/ arr[i * 2 + 1 + sh][sortBy]
              ) {
                [arr[i * 2 + 1 + sh], arr[i * 2 + 2 + sh]] = [
                  arr[i * 2 + 2 + sh],
                  arr[i * 2 + 1 + sh],
                ];
                b = true;
              }
            } else if (i * 2 + 1 + sh < arr.length) {
              if (arr[i + sh][sortBy] > /*<*/ arr[i * 2 + 1 + sh][sortBy]) {
                [arr[i + sh], arr[i * 2 + 1 + sh]] = [
                  arr[i * 2 + 1 + sh],
                  arr[i + sh],
                ];
                b = true;
              }
            }
          }
          if (!b) ++sh; // Смещение увеличивается, когда на текущем этапе сортировать больше нечего
        } while (sh + 2 < arr.length); // Конец сортировки
      }
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[6].push(time);
      let sum = this.speads[6].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[6].length;
      this.avarageSpeads[6] = avarageTime;

      this.surname = "";
      this.group = "";
    },
    defaultSort() {
      let time = performance.now();
      arr.sort((a, b) => a - b);
      time = performance.now() - time;
      console.log("Время выполнения = ", time);

      this.speads[7].push(time);
      let sum = this.speads[7].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / this.speads[7].length;
      this.avarageSpeads[7] = avarageTime;

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
