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
      series: [
        {
          name: "CPP",
          data: this.$store.state.users.cppSpeads,
        },
        {
          name: "WASM",
          data: this.$store.state.users.wasmSpeads,
        },
        {
          name: "TypeScript/JavaScript",
          data: this.$store.state.users.tsSpeads,
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
            columnWidth: "20%",
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
            text: "Sorting schedule",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " ms";
            },
          },
        },
      },
    };
  },
})
export default class BarChart extends Vue {}
</script>
