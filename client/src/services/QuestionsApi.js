import axios from "axios";

class QuestionsApi {
  constructor() {
    this._apiUrl = `http://localhost:8000/api/questions`;
  }

  async getQuestions(category, difficulty) {
    let url = this._apiUrl;

    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    if (!category && difficulty) {
      url += `?difficulty=${encodeURIComponent(difficulty)}`;
    }
    if (category && difficulty) {
      url += `&difficulty=${encodeURIComponent(difficulty)}`;
    }
    console.log(url);
    const response = await axios.get(url);
    return response.data.data;
  }

  createQuestion(data) {
    return axios.post(this._apiUrl, data);
  }
}

export default new QuestionsApi();
