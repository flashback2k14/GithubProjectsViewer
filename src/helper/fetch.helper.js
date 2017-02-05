import StorageHelper from "./storage.helper";

class FetchHelper {

  constructor (username, password) {
    this._authUser = username;
    this._authPw = password;
  }

  _getHeader () {
    const auth = btoa(`${this._authUser}:${atob(this._authPw)}`);
    const ghHeaders = new Headers();
    ghHeaders.append("Accept", "application/vnd.github.inertia-preview+json");
    ghHeaders.append("Authorization", `Basic ${auth}`);
    ghHeaders.append("User-Agent", "flashback2k14::Vue2::GithubProjectsViewer");
    return ghHeaders;
  }

  _getIssueHeader () {
    const auth = btoa(`${this._authUser}:${atob(this._authPw)}`);
    const ghHeaders = new Headers();
    ghHeaders.append("Authorization", `Basic ${auth}`);
    ghHeaders.append("User-Agent", "flashback2k14::Vue2::GithubProjectsViewer");
    return ghHeaders;
  }

  _getAllProjectsUrl (username, repo) {
    return `https://api.github.com/repos/${username}/${repo}/projects`;
  }

  _getAllColumnsFromProject (projectId) {
    return `https://api.github.com/projects/${projectId}/columns`;
  }

  _getAllCardsFromColumn (columnId) {
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
      fetch(this._getAllColumnsFromProject(id), {
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
      fetch(this._getAllCardsFromColumn(id), {
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
}

export default FetchHelper;