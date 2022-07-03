import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['task/dashboard']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['auth/login']);
      }
    );
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successful');
        this.router.navigate(['auth/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['auth/register']);
      }
    );
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.clear();
        this.router.navigate(['auth/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  //Guard
  IsloggedIn() {
    return !!localStorage.getItem('token');
  }
}
