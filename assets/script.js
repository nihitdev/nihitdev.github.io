const text = "ship something today";
const typing = document.getElementById("typing");
let index = 0;

function type() {
  if (index < text.length) {
    typing.textContent += text[index++];
    setTimeout(type, 75);
  }
}

setTimeout(type, 700);

document.getElementById("year").textContent = new Date().getFullYear();

const button = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

button?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    button?.setAttribute("aria-expanded", "false");
  });
});
