import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeserviceService } from 'src/app/services/employeeservice/employeeservice.service';

const REGEX_NAME = new RegExp("^[A-Z][a-z]{2,}$");


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

    form: FormGroup;
  
  departmentList : Array<string> = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  selectedDepartments = [];
  departmentSelectionError = true;

  constructor(private formBuilder: FormBuilder, private employeeservice : EmployeeserviceService,
    private router : Router) {
    this.form = this.formBuilder.group({
      name : ['', [Validators.required, Validators.pattern(REGEX_NAME)]],
      profileImage: [''],
      gender: ['', [Validators.required, Validators.pattern(new RegExp("male|female"))]],
      salary : ['', Validators.required],
      day: ['', Validators.required],
      month:['', Validators.required],
      year:['', Validators.required],
      notes : [''],
      departments: this.addDepartmentControl()
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid && !this.departmentSelectionError){
      console.log(this.form.value);
    
      let reqObj = {
        name: this.form.value.name,
        profileImage : this.form.value.profileImage,
        gender: this.form.value.gender,
        departments: this.selectedDepartments,
        salary: this.form.value.salary,
        startDate: this.form.value.day + " " + this.form.value.month + " " + this.form.value.year,
        notes: this.form.value.notes
      }
      console.log(reqObj);
      this.employeeservice.addEmployee(reqObj).subscribe((response:any)=>{
        console.log("Response: " , response);
        this.router.navigateByUrl('/home');
      }, (error)=>{
        console.log(error);
      });
    }
  }

  addDepartmentControl(){
    const arr = this.departmentList.map(element=>{
      return this.formBuilder.control(false);
    })
    return this.formBuilder.array(arr);
  }

  get departmentArray(){
    return <FormArray>this.form.get('departments');
  }

  getSelectedDepartmentValues(){
    this.selectedDepartments = [];
    this.departmentArray.controls.forEach((control, i)=>{
      if(control.value)
        this.selectedDepartments.push(this.departmentList[i]);
    });
    this.departmentSelectionError = this.selectedDepartments.length > 0 ? false : true;
  }

  checkDepartmentControlTouched(){
    let flag = false;
    this.departmentArray.controls.forEach((control) =>{
      if(control.touched)
        flag = true;
    })
    return flag;
  }
  
  reset(){
    this.form.reset;
  }


}
