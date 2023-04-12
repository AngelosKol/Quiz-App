import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import Table from "./components/Table";
import "./css/style.css";
const playBtn = document.querySelector(".play-btn");

const modal = new Modal();
const questionForm = new QuestionForm();
const questionList = new QuestionList();
const myTable = new Table();
questionForm.render();
// questionList.render();

playBtn.addEventListener("click", () => {
  myTable.render();
});
