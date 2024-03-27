const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdownS = document.querySelectorAll(".select select");
let btn = document.querySelector(".formButton");
let fromCurr = document.querySelector(".fromSelect select");
let toCurr = document.querySelector(".toSelect select");

document.addEventListener("DOMContentLoaded", (evt) => {
  updatePage();
});

for (let select of dropdownS) {
  for (currCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode;
    newOpt.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOpt.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOpt.selected = "selected";
    }
    select.append(newOpt);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let curCode = element.value;
  let countryCode = countryList[curCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updatePage();
});

const updatePage = async () => {
  let amount = document.querySelector(".formInput input");
  let amtVal = amount.value;
  if (amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let respone = await fetch(URL);
  let data = await respone.json();
  let exRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmt = amtVal * exRate;

  let ansBox = document.querySelector(".formInfo");
  ansBox.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  ansBox.value = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
