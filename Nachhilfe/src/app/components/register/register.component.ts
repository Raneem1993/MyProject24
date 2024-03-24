
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user';
import { ConfirmComponent } from '../confirm/confirm.component';

export interface DialogData {
  headline: string;
  info: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required)
  });
  roles = [ "admin", "user"];
  hide = true;
  hide2 = true;
  user!: User;

  constructor(private auth: AuthService, private router: Router,public dialog: MatDialog) {}

  onSubmit(): void {
    const values = this.registerForm.value;
    this.user = {
      username: values.username!,
      password: values.password!,
      email: values.email!,
      role: values.role!
    };
    console.log(this.user)
    this.auth.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('response', response)
          this.user = response;
          this.auth.login(this.user)
          this.openDialog({ headline: "Erfolg", info: "User " + response.username + " registriert!" });
          this.router.navigateByUrl('/startseite');
        },
        error: (err) => {
          console.log('error', err.error.error)
          this.openDialog({ headline: "Fehler", info: "username und/oder E-Mail existiert bereits" });
          this.router.navigateByUrl('/users');
        },
        complete: () => console.log('register completed')
    })

  }

    openDialog(data: DialogData) {
      this.dialog.open(ConfirmComponent, { data });

  }

}
