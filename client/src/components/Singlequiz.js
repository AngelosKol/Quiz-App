import QuestionsApi from "../services/QuestionsApi";

class Singlequiz {
  constructor() {
    this.body = document.querySelector("body");
    this._questions = [];
  }

  async getQuestions() {
    try {
      const response = await QuestionsApi.getQuestions();
      this._questions = response.data.data;
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

  changeQuestion(question, answersArray) {
    const heading = document.getElementById("question");
    heading.innerHTML = `${question.question}`;
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    choices.forEach((choice, i) => {
      choice.innerText = `${answersArray[i]}`;
      choice.addEventListener("click", () => {
        if (choice.innerText === question.correctAnswer) {
          // increment the counter for correct answers
          correctAnswers++;
          // add a class to highlight the correct answer
          choice.classList.add("correct");
        } else {
          // add a class to highlight the incorrect answer
          choice.classList.add("incorrect");
        }
        // disable all choices after an answer is selected
        choices.forEach((choice) => {
          choice.removeEventListener("click", () => {});
          choice.classList.add("disabled");
        });
      });
    });
  }

  async render() {
    await this.getQuestions();
    const question = this._questions[Math.floor(Math.random() * 380)];
    const answers = [question.correctAnswer].concat(question.incorrectAnswers);
    this.shuffleArray(answers);
    this.body.classList.add("flex-simple");
    this.body.innerHTML = `
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
  <button class="btn">Return</button>
  <button class="btn" id="next">Next</button>
  </div>
  
  </div>
   `;
    const nextButton = document.querySelector("#next");
    nextButton.addEventListener("click", () => {
      const nextQuestion = this._questions[Math.floor(Math.random() * 380)];
      const nextAnswers = [nextQuestion.correctAnswer].concat(
        nextQuestion.incorrectAnswers
      );
      this.shuffleArray(nextAnswers);
      this.changeQuestion(nextQuestion, nextAnswers);
    });
  }
}

export default Singlequiz;
