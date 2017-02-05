import StorageHelper from "./storage.helper";

class FetchHelper {

  constructor (username, password) {
    this._authUser = username;
    this._authPw = password;
  }

  getHeader () {
    const auth = btoa(`${this._authUser}:${atob(this._authPw)}`);
    const ghHeaders = new Headers();
    ghHeaders.append("Accept", "application/vnd.github.inertia-preview+json");
    ghHeaders.append("Authorization", `Basic ${auth}`);
    ghHeaders.append("User-Agent", "flashback2k14::Vue2GithubProjectsViewer");
    return ghHeaders;
  }

  getAllProjectsUrl (username, repo) {
    return `https://api.github.com/repos/${username}/${repo}/projects`;
  }

  getAllColumnsFromProject (projectId) {
    return `https://api.github.com/projects/${projectId}/columns`;
  }

  getProjectsData (username, repo) {
    return new Promise((resolve, reject) => {
      fetch(this.getAllProjectsUrl(username, repo), {
        method: "GET",
        headers: this.getHeader()
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error.message));
    });
  }

  getColumnsDataById (id) {
    return new Promise((resolve, reject) => {
      fetch(this.getAllColumnsFromProject(id), {
        method: "GET",
        headers: this.getHeader()
      })
      .then(r => r.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }
}

export default FetchHelper;