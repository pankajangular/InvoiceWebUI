import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { ApiEndPoint } from '../enum/api-end-point.enum';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }




  // Resgiter Api
  register(user: User) {
    localStorage.setItem('email', user.email)
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.register, user)
  }

  // Verify Email Api
  onVerify(code: string) {
    const email = localStorage.getItem('email');
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.confirmEmail, { code, email });
  }

  // On Resend OTP Api
  onResendOtp() {
    const email = localStorage.getItem('email');
    return this.http.post<any>(environment.apiUrl + '/' + ApiEndPoint.resendOtp, { 'email': email })
  }


}
