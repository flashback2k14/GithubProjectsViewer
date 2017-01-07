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
}

export default FetchHelper;