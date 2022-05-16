import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Store token
   * @param token string
   */
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  storeUid(uid: string) {
    localStorage.setItem('uid', uid);
  }

  /*storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }*/

  /**
   * Delete token
   */
  deleteToken() {
    localStorage.removeItem('token');
  }

  deleteUid() {
    localStorage.removeItem('uid');
  }

  deleteUser() {
    localStorage.removeItem('user');
  }


  clear(): void {
    localStorage.clear();
  }
}
