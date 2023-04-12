import axios from "axios";

class QuestionsApi {
  constructor() {
    this._apiUrl = `http://localhost:8000/api/questions`;
  }

  getQuestions() {
    return axios.get(this._apiUrl);
  }

  createQuestion(data) {
    return axios.post(this._apiUrl, data);
  }
}

export default new QuestionsApi();
