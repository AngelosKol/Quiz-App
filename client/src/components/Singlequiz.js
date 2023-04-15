import QuestionsApi from "../services/QuestionsApi";

class Singlequiz {
  constructor() {
    this.div = document.querySelector(".container");
    this.header = document.querySelector("header");
    this._questions = [];
    this.correctAnswers = 0;
  }

  async startQuiz() {
    try {
      const response = await QuestionsApi.getQuestions();
      this._questions = response;
      console.log(this._questions);
    } catch (error) {
      console.log(error);
    }
  }
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  handleReturn() {
    this.div.classList.remove("flex-simple");
    this.div.innerHTML = "";
    this.header.style.display = "block";
  }

  changeQuestion(question, answersArray) {
    const heading = document.getElementById("question");
    const choices = Array.from(document.getElementsByClassName("choice-text"));

    // remove all event listeners from the choices
    choices.forEach((choice) => {
      choice.removeEventListener("click", () => {});
    });

    heading.innerHTML = `${question.question}`;

    choices.forEach((choice, i) => {
      choice.innerText = `${answersArray[i]}`;
      choice.addEventListener("click", () => {
        if (choice.innerText === question.correctAnswer) {
          this.correctAnswers++;
          choice.classList.add("correct");
        } else {
          choice.classList.add("incorrect");
          choice.classList.add("disabled");
        }
        // disable all choices after an answer is selected
        choices.forEach((choice) => {
          choice.removeEventListener("click", () => {});
        });
      });
    });

    //remove all classes from the choices
    choices.forEach((choice) => {
      choice.classList.remove("correct");
      choice.classList.remove("incorrect");
      choice.classList.remove("disabled");
    });
  }

  async render() {
    await this.startQuiz();
    const question = this._questions[Math.floor(Math.random() * 380)];
    const answers = [question.correctAnswer].concat(question.incorrectAnswers);
    this.shuffleArray(answers);
    this.header.style.display = "none";
    this.div.classList.add("flex-simple");
    this.div.innerHTML = `
    <div class="quiz-container">
    <h2 id="question">${question.question}</h2>
    <div class="choice-container">
      <p class="choice-prefix">A</p>
      <p class="choice-text" data-number="1">${answers[0]}</p>
    </div>
    <div class="choice-container">
      <p class="choice-prefix">B</p>
      <p class="choice-text" data-number="2">${answers[1]}</p>
    </div>
    <div class="choice-container">
      <p class="choice-prefix">C</p>
      <p class="choice-text" data-number="3">${answers[2]}</p>
    </div>
    <div class="choice-container">
      <p class="choice-prefix">D</p>
      <p class="choice-text" data-number="4">${answers[3]}</p>
    </div>
  </div>
  <div class="btn-container">
  <button class="btn" id="return">Return</button>
  <button class="btn" id="next">Next</button>
  </div>
  
  </div>
   `;
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        if (choice.innerText === question.correctAnswer) {
          this.correctAnswers++;
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

    //next button handler
    const nextButton = document.querySelector("#next");
    nextButton.addEventListener("click", () => {
      const nextQuestion = this._questions[Math.floor(Math.random() * 380)];
      const nextAnswers = [nextQuestion.correctAnswer].concat(
        nextQuestion.incorrectAnswers
      );
      this.shuffleArray(nextAnswers);
      this.changeQuestion(nextQuestion, nextAnswers);
    });

    //return button handler
    document
      .querySelector("#return")
      .addEventListener("click", this.handleReturn.bind(this));
  }
}

export default Singlequiz;
