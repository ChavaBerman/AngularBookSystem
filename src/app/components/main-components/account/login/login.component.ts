import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  obj: typeof Object = Object;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

    // reset login status
    this.userService.logout();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', this.createValidatorArr("name", 3, 15)),
      password: new FormControl('', this.createValidatorArr("password", 5, 10))
    });



  }
  createValidatorArr(cntName: string, min: number, max: number): Array<ValidatorFn> {
    let arrErrors = [];
    arrErrors.push(f => f.touched && !f.value ? { "val": `${cntName} is required` } : null);
    arrErrors.push(f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null);
    arrErrors.push(f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null);
    if (cntName == "name")
      arrErrors.push(f => f.value && !f.value.match(/[a-z]/i) ? { "val": `${cntName} must contains English chars` } : null);
    return arrErrors;
  }

  //get form fields:
  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.loginForm.invalid) {
      this.userService.login(this.formControls.username.value, this.formControls.password.value).subscribe(res => {
        if (res) {
          this.userService.logUserIn(res);
          
        }
        else  swal({
          title: 'This user does not exist!',
          type: 'warning',
          confirmButtonText: 'OK'
        })


      });


    }

  }

}


