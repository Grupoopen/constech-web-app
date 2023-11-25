import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../services/core.service';
import { EmployeeService } from '../../services/employee.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: [''],
      gender: [''],
      education: [''],
      company: [''],
      experience: [''],
      packageAmount: [''],
    });
  }

  ngOnInit(): void {
    // Puedes usar el método patchValue para llenar el formulario con datos existentes
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    console.log('Form data:', this.empForm.value);

    if (this.empForm.valid) {
      if (this.data) {
        // Actualizar empleado existente
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe(
            (val: any) => {
              this._coreService.openSnackBar('Engineer detail updated!');
              this._dialogRef.close(true);
            },
            (err: any) => {
              console.error('Error updating engineer:', err);
            }
          );
      } else {
        // Agregar nuevo empleado
        this._empService.addEmployee(this.empForm.value).subscribe(
          (val: any) => {
            this._coreService.openSnackBar('Engineer added successfully');
            this._dialogRef.close(true);
          },
        );
      }
    }
  }
}
