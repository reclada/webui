import { action, makeObservable, observable } from 'mobx';

export class UserModel {
  @observable isLogged = false;

  @observable token: string | null = null;

  @observable userName: string = '';

  constructor() {
    makeObservable(this);
  }

  @action
  login(token: string, userName: string) {
    this.isLogged = true;
    this.token = token;
    this.userName = userName;
  }

  @action
  logout() {
    this.isLogged = false;
    this.token = null;
    this.userName = '';
  }
}
