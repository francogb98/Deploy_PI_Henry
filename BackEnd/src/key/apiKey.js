const apikey = {
  1: "783724afcab640a6bd014ee8b97b0917",

  2: "65fba3c239674ca1ace716c9b23de63e",

  3: "04a5b95d938d4b19a0c9f9bfa27623e9",

  4: "4c351f4c0ef74d9a98db17b4f7c16359",

  5: "cf9128087f744e819ac30d4b8c43ba4b",

  6: "dd5a60a37ce0452aa5ed890fd0cce0fd",

  petitions: 0,
  maxPetitions: 150,
};
const { petitions, maxPetitions } = apikey;
let count = 1;
let valueKey = apikey.count;

const sumPetitions = () => {
  petitions++;
  if (petitions === maxPetitions) {
    count < 6 ? (count = count + 1) : (count = 1);
    petitions = 0;
  }
};

module.exports = { valueKey, sumPetitions };
