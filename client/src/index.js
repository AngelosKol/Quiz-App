import "@fortawesome/fontawesome-free/css/all.css";
import "./css/style.css";
import Modal from "./components/Modal";
import QuestionForm from "./components/QuestionForm";
import Singlequiz from "./components/Singlequiz";
import Filtered from "./components/Filtered";

const randomPlayBtn = document.getElementById("random-mode");
const filterPlayBtn = document.getElementById("filter-mode");

// const modal = new Modal();
const questionForm = new QuestionForm();
const singleQuiz = new Singlequiz();
const filteredMode = new Filtered();
questionForm.render();

randomPlayBtn.addEventListener("click", () => {
  singleQuiz.render();
});

filterPlayBtn.addEventListener("click", () => {
  filteredMode.render();
});
