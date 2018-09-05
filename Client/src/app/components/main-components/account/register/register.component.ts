import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  obj: typeof Object = Object;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('', this.createValidatorArr("firstnsame", 2, 15)),
      lastname: new FormControl('', this.createValidatorArr("lastname", 2, 15)),
      username: new FormControl('', this.createValidatorArr("username", 3, 15)),
      password: new FormControl('', this.createValidatorArr("password", 5, 10))
    });

 

  }
  createValidatorArr(cntName: string, min: number, max: number): Array<ValidatorFn> {
    let arrErrors=[];
    arrErrors.push( f => f.touched && !f.value ? { "val": `${cntName} is required` } : null);
    arrErrors.push( f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null);
    arrErrors.push(  f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null);
    //all inputs except password get another validation:
    if(cntName!="password")
    arrErrors.push( f => f.value && !f.value.match(/[a-z]/i) ? {"val": `${cntName} must contains English chars`} : null); 
    return arrErrors;
  }

  //get form fields:
  get formControls() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerForm.invalid) {
      this.userService.register(JSON.stringify(this.registerForm.value)).subscribe(info=>{
      if(!info)
      swal({
        title: 'This user already exists!',
        text: 'please change either username nor password',
        type: 'error',
        confirmButtonText: 'OK'
      })
      else
      {
        this.userService.logUserIn(info);
        swal({
          title: 'This user was added successfully!',
          type: 'success',
          confirmButtonText: 'OK'
        })}
      });
    }
  }
}
