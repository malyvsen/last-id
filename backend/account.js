import Key from "./crypto/key.js";

export default class Account {
  constructor(name, publicKey, links = []) {
    this.name = name;
    this.key = new Key({ publicKey: publicKey });
    this.links = links;
  }

  unlock(password) {
    this.key.unlock(this.name + password);
  }

  get neighbors() {
    const withDuplicates = this.validLinks.reduce(function(neighbors, link) {
      return (
        neighbors +
        link.accounts.filter(
          account => account.key.publicKey !== this.key.publicKey
        )
      );
    }, []);
    return [...new Set(withDuplicates)]; // this compares references, but that's okay for our purposes
  }

  get validLinks() {
    return this.links.reduce(function(onlyValid, link) {
      if (link.valid) return onlyValid.push(link);
      else return onlyValid;
    }, []);
  }
}
