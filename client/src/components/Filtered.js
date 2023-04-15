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

  async render() {
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
      .addEventListener("click", this.getCategory);
  }
}

export default Filtered;
