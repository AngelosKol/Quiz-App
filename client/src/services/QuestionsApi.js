import axios from "axios";

class QuestionsApi {
  constructor() {
    this._apiUrl = `http://localhost:8000/api/questions`;
  }

  getQuestions(category, difficulty) {
    let url = this._apiUrl;

    if (category) {
      url += `?category=${category}`;
    }

    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }

    return axios.get(url).then((response) => {
      return response.data.data;
    });
  }

  createQuestion(data) {
    return axios.post(this._apiUrl, data);
  }
}

export default new QuestionsApi();
