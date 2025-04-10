const topHeading = document.querySelector("h1");
const header = document.querySelector("header");
console.log(header.innerHTML);
let course = "IntMed";
header.innerHTML += `<h3> this is ${course}</h3>`;
// console.log(topHeading);
//console.log(topHeading.textContent);
//topHeading.textContent = "new heading";
//const allParas = document.querySelectorAll("p");
//console.log(allParas);
//for (let i = 0; i < allParas.length; i++) {
//  console.log(allParas[i].textContent);
// allParas[i].style.border = "1px solid green";
//}
