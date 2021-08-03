import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'otaku-login',
  templateUrl: './otaku-login.component.html',
  styleUrls: ['./otaku-login.component.css']
})
export class OtakuLoginComponent implements OnInit {
  public loginInvalid = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit() : void {

  }
}
