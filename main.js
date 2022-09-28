const addUser = document.querySelector("#add-user");
const dataDiv = document.querySelector(".data");
const doublMoney = document.querySelector("#doubly-money");
const showMillionaires = document.querySelector("#show-mill");
const sortRich = document.querySelector("#sort");
const calcTotal = document.querySelector("#calc-total");

let persons = [];

let addToDom = (person) => {
  let element = document.createElement("div");
  element.classList.add("person");
  element.innerHTML = `<span>${person.name}</span> <span>$${person.wealth
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>`;
  dataDiv.appendChild(element);

  let totalDiv = document.getElementById("total");
  if (totalDiv) totalDiv.remove();
};

let getRadomUser = async () => {
  let randomWealth = Math.random(),
    endWealth = 1000000;
  let res = await (await fetch("https://randomuser.me/api")).json();
  const person = {
    name: `${res.results[0].name.first} ${res.results[0].name.last}`,
    wealth: Math.floor(randomWealth * endWealth),
  };
  persons.push(person);
  addToDom(person);
};

let getDoublMoney = async () => {
  persons = persons.map((person) => {
    return { name: person.name, wealth: person.wealth * 2 };
  });
  defaltValue();
  // for (let i = 0; i < persons.length; i++) {
  //   let person = persons[i];
  //   persons = [{ name: person.name, wealth: person.wealth * 2 }];
  //   console.log(persons);
  // }
  // persons.forEach((person) => {
  //   addToDom(person);
  // });
};

let getShowMillionaires = async () => {
  persons = persons.filter((person) => person.wealth >= 1000000);
  defaltValue();
};

let getSort = async () => {
  persons = persons.sort((person1, person2) => person2.wealth - person1.wealth);
  defaltValue();
};

let getCalcTotal = async () => {
  let totalDiv = document.getElementById("total");
  if (totalDiv) totalDiv.remove();
  let totalWealth = persons.reduce(
    (total, person) => (total += person.wealth),
    0
  );
  let ele = document.createElement("div");
  ele.id = "total";
  ele.innerHTML = `<span>Total</span> <span>$${totalWealth
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>`;
  dataDiv.appendChild(ele);
  console.log(totalWealth);
};

addUser.addEventListener("click", getRadomUser);
doublMoney.addEventListener("click", getDoublMoney);
showMillionaires.addEventListener("click", getShowMillionaires);
sortRich.addEventListener("click", getSort);
calcTotal.addEventListener("click", getCalcTotal);

function defaltValue() {
  dataDiv.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  persons.forEach((person) => {
    addToDom(person);
  });
}
