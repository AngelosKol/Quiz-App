import QuestionsApi from "../services/QuestionsApi";

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
      console.log(this._categories);
    } catch (error) {
      console.log(error);
    }
  }

  async renderQuestions() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const response = await QuestionsApi.getQuestions(category, difficulty);
    this._questions = response;
    // Filter questions based on selected category and difficulty
    const filteredQuestions = this._questions.filter((question) => {
      return (
        (!category || question.category === category) &&
        (!difficulty || question.difficulty === difficulty)
      );
    });

    // Render the first five questions that match the filter criteria
    let html = "";
    for (let i = 0; i < filteredQuestions.length && i < 5; i++) {
      html += `
      <div>
        <h2>${filteredQuestions[i].question}</h2>
        <p>Category: ${filteredQuestions[i].category}</p>
        <p>Difficulty: ${filteredQuestions[i].difficulty}</p>
      </div>
    `;
    }
    this.div.innerHTML = html;
  }
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
    document
      .getElementById("filterBtn")
      .addEventListener("click", this.renderQuestions.bind(this));
  }
}

export default Filtered;
