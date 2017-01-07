class StorageHelper {

  static get Keys() {
    return {
      USER: "vue2::github::projects::user",
      PW: "vue2::github::projects::pw"
    };
  }

  static get (key) {
    return localStorage.getItem(key);
  }

  static set (key, value) {
    localStorage.setItem(key, value);
  }

  static remove (key) {
    localStorage.removeItem(key);
  }
}

export default StorageHelper;