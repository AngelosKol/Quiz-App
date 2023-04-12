import QuestionsApi from "../services/QuestionsApi";

class Table {
  constructor() {
    this.tableEl = document.querySelector("#table");
    this._questions = [];
    this.getQuestions();
  }

  async getQuestions() {
    try {
      const response = await QuestionsApi.getQuestions();
      this._questions = response.data.data;
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

  async render() {
    await this.getQuestions();
    const question = this._questions[Math.floor(Math.random() * 80)];
    const answers = [question.correctAnswer].concat(question.incorrectAnswers);
    this.shuffleArray(answers);
    this.tableEl.innerHTML = `
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
    `;
  }
}

export default Table;
