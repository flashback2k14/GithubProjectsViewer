import moment from "moment";

class MomentHelper {

  convert (value) {
    return moment(String(value)).format("DD.MM.YYYY hh:mm")
  }
}

export default new MomentHelper();