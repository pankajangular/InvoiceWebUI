import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { ApiEndPoint } from '../enum/api-end-point.enum';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private toaster: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  // Auth Functions
  login(user: User) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.login, user)
      .pipe(map(user => {
        if (user.success) {
          localStorage.setItem('currentUser', JSON.stringify(user.user_info));
          this.currentUserSubject.next(user.user_info);
          this.toaster.success(user.message);
        }
        else {
          if (user.userstatus) {
            this.router.navigateByUrl('/otp')
          }
          else
            this.router.navigateByUrl('/login');
          this.toaster.error(user.message);
        }
        return user.success;
      }));
  }



  // remove user from local storage to log user out
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/')
  }



  //forgot password (If user forgot  password)
  forgotPassword(email: string) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.forgotPassword, email)
      .pipe(map(user => {
        if (user.userstatus) {
          this.toaster.success(user.message);
        }
        else {
          this.toaster.error(user.message);
        }
        return user.userstatus;
      }));
  }



  //if user want to change password
  changePassword(user: User) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.changePassword, user)
      .pipe(map(user => {

        if (user.success == true) {
          this.toaster.success(user.message)
        }
        else {
          this.toaster.error(user.message);
        }
        return user.userstatus;
      }));
  }




  //if user want to reset password
  resetPassword(code: number, email: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.resetPassword, { code, email, password })
      .pipe(map(user => {
        if (user.userstatus == true) {
          this.toaster.success(user.message);
        }
        else {
          this.toaster.error(user.message);
        }
        return user.userstatus;
      }));
  }
}
