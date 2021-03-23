export default {
  methods: {
    setSpead(speads, time, numberOfSort) {
      speads[numberOfSort].push(time);
      let sum = speads[numberOfSort].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let avarageTime = sum / speads[numberOfSort].length;
      return avarageTime;
    },
  },
};
