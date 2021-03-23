<script>
import { Bar } from "vue-chartjs";
import { typeOfSorts } from "@/constants/";

export default {
  extends: Bar,
  props: {
    spead: {
      type: Array,
    },
  },
  data() {
    return {
      chartdata: {
        labels: typeOfSorts,
        datasets: [
          {
            label: "Comparison of speed sorting methods",
            backgroundColor: "#448aff",
            data: this.spead,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
