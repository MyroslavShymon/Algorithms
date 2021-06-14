<template>
  <div>
    <apexchart
      type="bar"
      height="450"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  name: "BarChart",
  data() {
    return {
      averageSortingSpeedCPP: [] as number[],
      averageSortingSpeedWASM: [] as number[],
      averageSortingSpeedTS: [] as number[],
      series: [
        {
          name: "CPP",
          data: this.averageSortingSpeedCPP,
        },
        {
          name: "WASM",
          data: this.averageSortingSpeedWASM,
        },
        {
          name: "TypeScript/JavaScript",
          data: this.averageSortingSpeedTS,
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 450,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Bubble", "Quick", "Default"],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    };
  },
  mounted() {
    //   this.$store.state.users.sortsTime.forEach(element => {
    //   });
    // this.$store.state.users.sortsTime[0].reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue;
    // }) / this.$store.state.users.sortsTime[0].length;
    // this.averageSortingSpeedCPP.push()
  },
})
export default class BarChart extends Vue {}
</script>
