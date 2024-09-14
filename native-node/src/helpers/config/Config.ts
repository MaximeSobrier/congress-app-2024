import production from "./production.conf";
import development from "./development.conf";
import test from "./test.conf";
import staging from "./staging.conf";


export default class Config {
  static get() {
    if (process.env.NODE_ENV === "production") {
      return production;
    } else if (process.env.NODE_ENV === "test") {
      return test;
    } else if (process.env.NODE_ENV === "staging") {
      return staging;
    } else {
      return development;
    }
  }
}
