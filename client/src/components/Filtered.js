import QuestionsApi from "../services/QuestionsApi";
import Singlequiz from "./Singlequiz";

class Filtered {
  constructor() {
    this.div = document.querySelector(".container");
    this._questions = [];
    this._categories = [];
    this.singlequiz = new Singlequiz();
  }

  addEventListeners() {
    this._submitBtn.addEventListener("click", this.renderQuestions.bind(this));
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

  choicesHandler() {
    choices.forEach((choice, i) => {
      choice.addEventListener("click", () => {
        if (choice.innerText === question.correctAnswer) {
          this.correctAnswers++;
          console.log(this.correctAnswers);
          choice.classList.add("correct");
        } else {
          choice.classList.add("incorrect");
          choice.classList.add("disabled");
        }
        choices.forEach((choice) => {
          choice.removeEventListener("click", () => {});
        });
      });
    });
  }

  //Renders the first five questions that match the filter criteria

  async renderQuestions() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const response = await QuestionsApi.getQuestions(category, difficulty);
    this._questions = response;
    // Filter questions based on selected category and difficulty
    const filteredQuestions = this._questions
      .filter((question) => {
        return (
          (!category || question.category === category) &&
          (!difficulty || question.difficulty === difficulty)
        );
      })
      .slice(0, 5);
    // Render the first five questions that match the filter criteria

    while (this.div.firstChild) {
      this.div.removeChild(this.div.firstChild);
    }

    // Append each question container to the container
    for (let i = 0; i < filteredQuestions.length; i++) {
      const question = filteredQuestions[i];
      const answers = [question.correctAnswer].concat(
        question.incorrectAnswers
      );
      this.singlequiz.shuffleArray(answers);

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

      this.div.appendChild(questionContainer);
    }
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
    this.addEventListeners();
  }
}

export default Filtered;
