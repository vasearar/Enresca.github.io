const forChange = document.querySelectorAll(".forChange");
const deceText = document.querySelectorAll(".dece-text");
let activeIndex = 0;


deceText[activeIndex].style.display = "block";
forChange[activeIndex].textContent = "-";

forChange.forEach((titl, index) => {
  titl.addEventListener("click", () => {
    if (activeIndex === index) {
      titl.textContent = "+";
      deceText[index].style.display = "";
      activeIndex = -1;
    } else {
      if (activeIndex !== -1) {
        forChange[activeIndex].textContent = "+";
        deceText[activeIndex].style.display = "";
      }
      titl.textContent = "-";
      deceText[index].style.display = "block";
      activeIndex = index;
    }
  });
});
