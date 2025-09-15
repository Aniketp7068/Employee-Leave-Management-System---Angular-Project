import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  route = inject(Router);
  onLogOut() {
    localStorage.removeItem('leaveUserData');
    this.route.navigateByUrl('/login');
  }
}
