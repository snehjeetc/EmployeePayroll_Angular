import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeserviceService } from 'src/app/services/employeeservice/employeeservice.service';

const REGEX_NAME = new RegExp("^[A-Z][a-z]{2,}$");

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  name: string;
  profileImage : string; 
  gender: string;
  departments: string[];
  salary;
  day;
  month;
  year;
  notes: string;
  checkList: any[] = [];

  departmentList : Array<string> = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  selectedDepartments;
  departmentSelectionError = true;

  constructor(public dialogRef : MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data : any, 
  private employeeService : EmployeeserviceService, 
  private formBuilder : FormBuilder, 
  private router : Router) {
    this.form = formBuilder.group({
     name : ['', [Validators.required, Validators.pattern(REGEX_NAME)]],
      profileImage: [''],
      gender: ['', [Validators.required, Validators.pattern(new RegExp("male|female"))]],
      salary : ['', Validators.required],
      day: ['', Validators.required],
      month:['', Validators.required],
      year:['', Validators.required],
      notes : [''],
      departments: this.addDepartmentControl(data.employee.departments)
    });
    this.name = data.employee.name;
    this.profileImage = data.employee.profileImage;
    this.gender = data.employee.gender;
    this.departments = data.employee.departments;
    this.salary = data.employee.salary;
    this.day  = data.employee.startDate.split("-")[2];
    this.month = this.monthValue(data.employee.startDate.split("-")[1]);
    this.year = data.employee.startDate.split("-")[0];
    this.notes = data.employee.string;
    this.departmentSelectionError = false;
   }

   addDepartmentControl(depts){
     this.fillCheckList(depts)
    const arr = this.checkList.map(element=>{
      return this.formBuilder.control(element.checked);
    })
    return this.formBuilder.array(arr);
  }

  get departmentArray(){
    return <FormArray>this.form.get('departments');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid && !this.departmentSelectionError){
      let obj = {
        name: this.form.value.name,
        profileImage : this.form.value.profileImage,
        gender: this.form.value.gender,
        departments: this.selectedDepartments,
        salary: this.form.value.salary,
        startDate: this.form.value.day + " " + this.form.value.month + " " + this.form.value.year,
        notes: this.form.value.notes
      }
      console.log(obj);
      this.employeeService.updateEmployeePayroll(this.data.employee.id, obj).subscribe((response) =>{
         console.log("Response : " , response);
         this.router.navigateByUrl('/home');
         this.dialogRef.close();
       })
    }
  }

  getSelectedDepartmentValues(){
    this.selectedDepartments = [];
    this.departmentArray.controls.forEach((control, i)=>{
      if(control.value)
        this.selectedDepartments.push(this.departmentList[i]);
    });
    console.log(this.selectedDepartments);
    this.departmentSelectionError = this.selectedDepartments.length > 0 ? false : true;
  }

  fillCheckList(dept){
    for(let i = 0, j=0; i < this.departmentList.length; i++){
      if(j < dept.length){
        if(this.departmentList[i] == dept[j]){
          this.checkList.push({
            id : i,
            value: this.departmentList[i],
            checked: true
          });
          j++;
        }
        else {
            this.checkList.push({
              id : i,
              value: this.departmentList[i],
              checked: false
            });
          }
        }
        else{
          this.checkList.push({
              id : i,
              value: this.departmentList[i],
              checked: false
            });
        }
      }
  }
  
  monthValue(month){
    switch(month){
      case "01" : return "Jan";
      case "02" : return "Feb";
      case "03" : return "Mar";
      case "04" : return "Apr";
      case "05" : return "May";
      case "06" : return "Jun";
      case "07" : return "Jul";
      case "08" : return "Aug";
      case "09" : return "Sep";
      case "10" : return "Oct";
      case "11" : return "Nov";
      case "12" : return "Dec"
    }
  }
 
  reset(){
   this.form.reset();
  }

}
