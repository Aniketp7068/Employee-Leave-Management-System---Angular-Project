import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { APIResponse, EmpModel, GetEmp } from '../../Model/employee-model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  ngOnInit(): void {
    this.getEmp();
    this.depList$ = this.empService.getDep();
    this.roleList$ = this.empService.getRole();
  }
  employeeObj: EmpModel = new EmpModel();

  employeeList: GetEmp[] = [];
  depList$: Observable<any[]> = new Observable<any[]>();
  roleList$: Observable<any[]> = new Observable<any[]>();

  @ViewChild('newModel') newModel!: ElementRef;

  empService = inject(EmployeeService);
  resetEmployeeObj() {
    this.employeeObj = new EmpModel(); // resets to default empty values
  }
  getEmp() {
    this.empService.getEmployee().subscribe({
      next: (response: APIResponse) => {
        this.employeeList = response.data;
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }
  openModel() {
    if (this.newModel) {
      this.newModel.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    if (this.newModel) {
      this.newModel.nativeElement.style.display = 'none';
    }
  }
  onSaveEmp() {
    this.empService.onSaveNewEmployee(this.employeeObj).subscribe({
      next: (response: any) => {
        if (response.result) {
          alert('API Called');
          this.employeeObj;
          this.getEmp();
          this.resetEmployeeObj();
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert(error.error);
      },
    });
  }

  updateEmployee() {
    this.empService.onUpdateEmp(this.employeeObj).subscribe({
      next: (response) => {
        alert('Employee Updated Successfully');
      },
      error: (error) => {
        console.error(error);
        alert('Update Failed: ' + (error.error || error.message));
      },
    });
  }
  onDeleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.onEmpDelete(id).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert('Record Deleted Successfully');
            this.closeModel();
            this.getEmp();
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          alert('Error: ' + error.message);
        },
      });
    }
  }
}
