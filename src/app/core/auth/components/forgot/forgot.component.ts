import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { forgotPassword } from '../../states/auth.actions';
import { AuthState } from '../../states/auth.reducer';
import { selectIsForgotPasswordLoading, selectIsForgotPasswordSuccess } from '../../states/auth.selector';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;
  submitted = false;
  isForgotLoading$: Observable<boolean | undefined>;
  isForgotSuccess$: Observable<boolean | undefined>;
  private readonly notifier!: NotifierService;
  constructor(private fb: FormBuilder, private store: Store<AuthState>, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
    this.isForgotLoading$ = this.store.pipe(select(selectIsForgotPasswordLoading));
    this.isForgotSuccess$ = this.store.pipe(select(selectIsForgotPasswordSuccess));
  }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      this.notifier.notify('error', 'Formulaire invalide');
      return;
    } else {
      this.store.dispatch(forgotPassword({ email: this.f.email.value }));
      this.isForgotSuccess$.subscribe(isForgotSuccess => {
        if (isForgotSuccess) {
          this.router.navigate(['/auth/login']);
        }
      });
    }
  }
}
