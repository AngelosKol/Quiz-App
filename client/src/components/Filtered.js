import QuestionsApi from "../services/QuestionsApi";
import { shuffleArray } from "../utils";
class Filtered {
  constructor() {
    this.div = document.querySelector(".container");
    this._questions = [];
    this._categories = [];
  }

  async getCategory() {
    try {
      const response = await QuestionsApi.getQuestions();
      const categories = response.map((question) => {
        return question.category;
      });
      this._categories = [...new Set(categories)];
    } catch (error) {
      console.log(error);
    }
  }

  //Renders the first five questions that match the filter criteria
  async renderQuestions() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const response = await QuestionsApi.getQuestions(category, difficulty);
    this._questions = response;

    const filteredQuestions = this.filterQuestions(category, difficulty);
    this.clearQuestions();

    for (let i = 0; i < filteredQuestions.length; i++) {
      const question = filteredQuestions[i];
      const answers = [question.correctAnswer].concat(
        question.incorrectAnswers
      );
      shuffleArray(answers);
      const questionContainer = this.createQuestionContainer(question, answers);
      this.appendQuestionContainer(questionContainer);
    }
  }

  //create a div for each question
  createQuestionContainer(question, answers) {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("quiz-container");

    const questionText = document.createElement("h2");
    questionText.classList.add("question-text");
    questionText.innerText = question.question;
    questionContainer.appendChild(questionText);

    const categoryText = document.createElement("p");
    categoryText.innerText = `Category: ${question.category}`;
    questionContainer.appendChild(categoryText);

    const difficultyText = document.createElement("p");
    difficultyText.innerText = `Difficulty: ${question.difficulty}`;
    questionContainer.appendChild(difficultyText);

    //loop through answers array and create a div for each answer
    for (let j = 0; j < answers.length; j++) {
      const choiceContainer = document.createElement("div");
      choiceContainer.classList.add("choice-container");
      const choicePrefix = document.createElement("p");
      choicePrefix.classList.add("choice-prefix");
      choicePrefix.innerText = String.fromCharCode(65 + j); // A, B, C, D
      choiceContainer.appendChild(choicePrefix);

      const choiceText = document.createElement("p");
      choiceText.classList.add("choice-text");
      choiceText.dataset.number = j + 1;
      choiceText.innerText = answers[j];
      choiceContainer.appendChild(choiceText);

      // Add event listener to each choice
      choiceText.addEventListener("click", () => {
        const selectedChoice = parseInt(choiceText.dataset.number);
        const correctChoice = answers.indexOf(question.correctAnswer) + 1;

        if (selectedChoice === correctChoice) {
          choiceContainer.classList.add("correct");
        } else {
          choiceContainer.classList.add("incorrect");
        }

        // Disable all choices after an answer is selected
        const allChoices =
          choiceContainer.parentElement.querySelectorAll(".choice-text");
        for (let k = 0; k < allChoices.length; k++) {
          allChoices[k].classList.add("disabled");
        }
      });

      questionContainer.appendChild(choiceContainer);
    }

    return questionContainer;
  }

  filterQuestions(category, difficulty) {
    return this._questions
      .filter((question) => {
        return (
          (!category || question.category === category) &&
          (!difficulty || question.difficulty === difficulty)
        );
      })
      .slice(0, 5);
  }

  clearQuestions() {
    while (this.div.firstChild) {
      this.div.removeChild(this.div.firstChild);
    }
  }

  appendQuestionContainer(questionContainer) {
    this.div.appendChild(questionContainer);
  }

  //Renders the form for filtering questions
  async renderForm() {
    await this.getCategory();
    this.div.innerHTML = `
        <form>
        <label for="category">Category:</label>
        <select name="category" id="category">
          <option value="">--Select category--</option>
          ${this._categories
            .map(
              (category) => `<option value="${category}">${category}</option>`
            )
            .join("")} 
                   </select>
        <br>
        <label for="difficulty">Difficulty:</label>
        <select name="difficulty" id="difficulty">
          <option value="">--Select difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br>
        <button type="button" id="filterBtn">Filter</button>
      </form>`;
    this._submitBtn = document.getElementById("filterBtn");
    this._submitBtn.addEventListener("click", this.renderQuestions.bind(this));
  }
}

export default Filtered;
