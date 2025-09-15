import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Router } from '@angular/router';
import { LoginModel } from '../../Model/employee-model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: LoginModel = new LoginModel();
  empService = inject(EmployeeService);
  route = inject(Router);
  onUserLogin() {
    this.empService.onUserLogin(this.loginObj).subscribe({
      next: (response: any) => {
        if (response.result) {
          alert('User Loggin SuccessFully');
          localStorage.setItem('leaveUserData', JSON.stringify(response.data));
          this.route.navigateByUrl('/dashboard');
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }
}
