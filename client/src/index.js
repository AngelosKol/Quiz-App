import "@fortawesome/fontawesome-free/css/all.css";
import "./css/style.css";
import Singlequiz from "./components/Singlequiz";
import Filtered from "./components/Filtered";

const randomPlayBtn = document.getElementById("random-mode");
const filterPlayBtn = document.getElementById("filter-mode");

// const modal = new Modal();
const singleQuiz = new Singlequiz();
const filteredMode = new Filtered();

randomPlayBtn.addEventListener("click", () => {
  singleQuiz.render();
});

filterPlayBtn.addEventListener("click", () => {
  filteredMode.renderForm();
});
