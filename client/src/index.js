import "@fortawesome/fontawesome-free/css/all.css";
import "./css/style.css";
import Modal from "./components/Modal";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import Singlequiz from "./components/Singlequiz";
import Filtered from "./components/Filtered";

const playBtn = document.querySelector(".play-btn");
const filterBtn = document.getElementById("filter-mode");

// const modal = new Modal();
const questionForm = new QuestionForm();
const questionList = new QuestionList();
const singleQuiz = new Singlequiz();
const filteredMode = new Filtered();
questionForm.render();

playBtn.addEventListener("click", () => {
  singleQuiz.render();
});

filterBtn.addEventListener("click", () => {
  filteredMode.render();
});
