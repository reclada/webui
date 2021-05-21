import { action, makeObservable, observable } from 'mobx';

export class UserModel {
  @observable isLogged = false;

  @observable userName: string = '';

  constructor() {
    makeObservable(this);
  }

  @action
  login(userName: string) {
    this.isLogged = true;
    this.userName = userName;
  }

  @action
  logout() {
    this.isLogged = false;
    this.userName = '';
  }
}
