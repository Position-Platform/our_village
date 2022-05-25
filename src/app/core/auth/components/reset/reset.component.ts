import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { resetPassword } from '../../states/auth.actions';
import { AuthState } from '../../states/auth.reducer';
import { selectIsResetPasswordLoading, selectIsResetPasswordSuccess } from '../../states/auth.selector';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  isResetLoading$: Observable<boolean | undefined>;
  isResetSuccess$: Observable<boolean | undefined>;
  private readonly notifier!: NotifierService;
  constructor(private fb: FormBuilder, private store: Store<AuthState>, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
    this.isResetLoading$ = this.store.pipe(select(selectIsResetPasswordLoading));
    this.isResetSuccess$ = this.store.pipe(select(selectIsResetPasswordSuccess));
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        token: ['', Validators.required],
        c_password: ['', Validators.required],
        password: ['', Validators.required]
      },
      {
        validator: this.mustMatch('password', 'c_password')
      }
    );
  }

  get f() {
    return this.resetForm.controls;
  }

  /**
   *Function tests if the 2 password entries match
   *
   * @param {string} controlName
   * @param {string} matchingControlName
   * @return {*}
   * @memberof RegisterComponent
   */
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      this.notifier.notify('error', 'Formulaire invalide');
      return;
    } else {
      this.store.dispatch(resetPassword({ email: this.f.email.value, token: this.f.token.value, password: this.f.password.value }));
      this.isResetSuccess$.subscribe(isResetSuccess => {
        if (isResetSuccess) {
          this.router.navigate(['/auth/login']);
        }
      });
    }
  }
}
