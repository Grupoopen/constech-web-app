import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  constructor(
    public authService: AuthService
  ){}
  ngOnInit(): void {
    
  }
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  
  @Input() error: string | null ;

  @Output() submitEM = new EventEmitter();
}

