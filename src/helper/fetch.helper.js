import StorageHelper from "./storage.helper";

class FetchHelper {

  constructor (username, password) {
    this._authUser = username;
    this._authPw = password;
  }

  _getHeader () {
    const auth = btoa(`${atob(this._authUser)}:${atob(this._authPw)}`);
    const ghHeaders = new Headers();
    ghHeaders.append("Accept", "application/vnd.github.inertia-preview+json");
    ghHeaders.append("Authorization", `Basic ${auth}`);
    ghHeaders.append("User-Agent", "flashback2k14::Vue2::GithubProjectsViewer");
    return ghHeaders;
  }

  _getIssueHeader () {
    const auth = btoa(`${atob(this._authUser)}:${atob(this._authPw)}`);
    const ghHeaders = new Headers();
    ghHeaders.append("Authorization", `Basic ${auth}`);
    ghHeaders.append("User-Agent", "flashback2k14::Vue2::GithubProjectsViewer");
    return ghHeaders;
  }

  _getAllProjectsUrl (username, repo) {
    return `https://api.github.com/repos/${username}/${repo}/projects`;
  }

  _getAllColumnsFromProjectUrl (projectId) {
    return `https://api.github.com/projects/${projectId}/columns`;
  }

  _getAllCardsFromColumnUrl (columnId) {
    return `https://api.github.com/projects/columns/${columnId}/cards?v=${new Date().toISOString()}`;
  }

  _postMoveCardToColumUrl (cardId) {
    return `https://api.github.com/projects/columns/cards/${cardId}/moves`;
  }

  _postAddNewCardToColumnUrl (columnId) {
    return `https://api.github.com/projects/columns/${columnId}/cards`;
  }

  getProjectsData (username, repo) {
    return new Promise((resolve, reject) => {
      fetch(this._getAllProjectsUrl(username, repo), {
        method: "GET",
        headers: this._getHeader()
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error.message));
    });
  }

  getColumnsDataById (id) {
    return new Promise((resolve, reject) => {
      fetch(this._getAllColumnsFromProjectUrl(id), {
        method: "GET",
        headers: this._getHeader()
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  getCardsDataById (id) {
    return new Promise((resolve, reject) => {
      fetch(this._getAllCardsFromColumnUrl(id), {
        method: "GET",
        headers: this._getHeader()
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  getIssueData (url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: this._getIssueHeader()
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  moveCardToAnotherColumn (cardId, columnId) {
    return new Promise((resolve, reject) => {
      fetch(this._postMoveCardToColumUrl(cardId), {
        method: "POST",
        headers: this._getHeader(),
        body: JSON.stringify({
          "position": "top",
          "column_id": columnId
        })
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  addNewCardToColumn (columnId, noteText) {
    return new Promise((resolve, reject) => {
      fetch(this._postAddNewCardToColumnUrl(columnId), {
        method: "POST",
        headers: this._getHeader(),
        body: JSON.stringify({
          "note": noteText
        })
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }
}

export default FetchHelper;