const burger = document.querySelector(".burger");
const body = document.querySelector(".body");
const trueBody = document.querySelector("body");
const menu = document.querySelector(".mobileNav");
const logo = document.querySelector("#logo");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

burger.addEventListener("click",() => {
  burger.classList.toggle("active");
  body.classList.toggle("blockY");
  trueBody.classList.toggle("blockY");
  menu.classList.toggle("appear");
  logo.classList.toggle("dissapear");
  main.classList.toggle("destroy");
  footer.classList.toggle("destroy");
});