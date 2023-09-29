import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormGroup, FormControl } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}