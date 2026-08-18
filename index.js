const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

//Selecting dropdown
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "PKR" ) {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img"); //Parent element gets the value for the both from and to.
    image.src = newSrc;
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault(); //no automation update in the tab after clicking the button
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let fromLowerCaseValue = fromCurr.value.toLowerCase();
    let toLowerCaseValue = toCurr.value.toLowerCase();
    console.log(fromLowerCaseValue, toLowerCaseValue);

    const URL = `${BASE_URL}/${fromLowerCaseValue}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromLowerCaseValue][toLowerCaseValue];
    let finalAmount = amtVal * rate;
    console.log(finalAmount);

    //Update Message Button
    let fromValue = document.querySelector(".amount input");
    let fromValueUI = document.querySelector("#fromValueUI");
    fromValueUI.innerText = fromValue.value;

    let fromCurrencyUI = document.querySelector("#fromCurrencyUI");
    fromCurrencyUI.innerText = fromCurr.value;

    let toValueUI = document.querySelector("#toValueUI")
    toValueUI.innerText = finalAmount.toFixed(3);

    let toCurrencyUI = document.querySelector("#toCurrencyUI");
    toCurrencyUI.innerText = toCurr.value;
});
