import { DatePipe, NgClass, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule, DatePipe, NgClass],
  templateUrl: './leave.html',
  styleUrl: './leave.css',
})
export class Leave implements OnInit {
  @ViewChild('newModal') newModal!: ElementRef;

  EmpLeaveServices = inject(EmployeeService);
  openModel() {
    if (this.newModal) {
      this.newModal.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    if (this.newModal) {
      this.newModal.nativeElement.style.display = 'none';
    }
  }

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    employeeName: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null),
  });

  leaveList: any[] = [];
  approvalLeaveList: any[] = [];
  currentTabName: string = 'myLeave';

  constructor() {
    const employeeData = localStorage.getItem('leaveUserData');
    if (employeeData !== null) {
      const loggedParseData = JSON.parse(employeeData);
      this.leaveForm.controls['employeeId'].setValue(
        loggedParseData.employeeId
      );
      this.leaveForm.controls['employeeName'].setValue(
        loggedParseData.employeeName
      );
    }
  }
  ngOnInit(): void {
    this.loadLeaves();
    this.getAllLeaves();
  }
  ChangeTab(tabName: string) {
    this.currentTabName = tabName;
  }
  loadLeaves() {
    const EmpId = this.leaveForm.controls['employeeId'].value;
    this.EmpLeaveServices.getAllLeavesByEmpId(EmpId).subscribe({
      next: (result: any) => {
        this.leaveList = result.data;
      },
    });
  }
  getAllLeaves() {
    this.EmpLeaveServices.getAllLeaves().subscribe({
      next: (result: any) => {
        this.approvalLeaveList = result.data.filter(
          (m: any) => m.isApproved == null
        );
      },
    });
  }

  onSave() {
    const formValue = this.leaveForm.value;
    this.EmpLeaveServices.onAddLeave(formValue).subscribe({
      next: () => {
        this.loadLeaves();
      },
    });
  }

  approveLeave(id: number) {
    this.EmpLeaveServices.approveLeave(id).subscribe({
      next: () => {
        this.getAllLeaves;
      },
    });
  }
  rejectLeave(id: number) {
    this.EmpLeaveServices.rejectLeave(id).subscribe({
      next: () => {
        this.getAllLeaves;
      },
    });
  }
}
