import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'otaku-register',
  templateUrl: './otaku-register.component.html',
  styleUrls: ['./otaku-register.component.css']
})
export class OtakuRegisterComponent implements OnInit {
  public loginInvalid = false;
  form: FormGroup;

  ngOnInit(): void {
  }

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

  onSubmit() : void {

  }
}
