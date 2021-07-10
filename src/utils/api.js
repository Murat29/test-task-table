class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }

  getUsers(number) {
    return fetch(this.url + number).then(this._getResponseData);
  }

  _getResponseData(data) {
    if (!data.ok) {
      return Promise.reject(`Ошибка: ${data.status}`);
    }
    return data.json();
  }
}

const configApi = {
  url: 'https://api.randomuser.me/?results=',
};

const api = new Api(configApi);

export default api;
