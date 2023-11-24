import { Component } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Response } from 'src/app/models/response';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent {

  constructor(public apiService: StudentsService,
    private toast: ToastrService) {
    this.apiService.student = null;
    this.apiService.students = null;
  }

  ngOnInit(): void {
    this.showAll();
  }

  findStudent(newStudentId: HTMLInputElement) {
    const studentId = parseInt(newStudentId.value);
    console.log(studentId)

    if (!isNaN(studentId)) {
      this.apiService.getOne(studentId).subscribe((res: any) => {
        console.log(res);
        if (res.error) {
          this.toast.warning('El ID no se ha encontrado', '', {positionClass: 'my-toast-position'});
          this.showAll();
        } else {
          this.apiService.students = res;
        }
      });
    } else {
      this.apiService.students = [];
    }
  }

  showAll() {
    this.apiService.getAll().subscribe((res: any) => {
      console.log(res);
      if (res.error)
        this.toast.warning('No hay estudiantes', '', {positionClass: 'my-toast-position'});
      else
        this.apiService.students = res;
    });
  }

  createStudent(event: Event, newStudentId: HTMLInputElement, newFirstName: HTMLInputElement,
    newLastName: HTMLInputElement, newGroupId: HTMLInputElement, newEnrollmentYear: HTMLInputElement) {
    event.preventDefault();
    const student: Student = {
      student_id: parseInt(newStudentId.value),
      first_name: newFirstName.value,
      last_name: newLastName.value,
      group_id: parseInt(newGroupId.value),
      enrollment_year: parseInt(newEnrollmentYear.value)
    };

    this.apiService.add(student).subscribe((res: Response) => {
      console.log(res);
      if (res.error)
        alert('Error al crear el estudiante');
      else {
        this.apiService.student = null;
        this.apiService.students = res.data;
        this.toast.success('Estudiante creado exitosamente', '', { positionClass: 'my-toast-position' });
      }
    });

    newStudentId.value = '';
    newFirstName.value = '';
    newLastName.value = '';
    newGroupId.value = '';
    newEnrollmentYear.value = '';
  }

  updateStudent(event: Event, newStudentId: HTMLInputElement, newFirstName: HTMLInputElement,
    newLastName: HTMLInputElement, newGroupId: HTMLInputElement, newEnrollmentYear: HTMLInputElement) {
    event.preventDefault();
    const student: Student = {
      student_id: parseInt(newStudentId.value),
      first_name: newFirstName.value,
      last_name: newLastName.value,
      group_id: parseInt(newGroupId.value),
      enrollment_year: parseInt(newEnrollmentYear.value)
    };

    this.apiService.edit(student).subscribe((res: Response) => {
      console.log(res);
      if (res.error)
        alert('Error al actualizar el estudiante');
      else {
        this.apiService.student = null;
        this.apiService.students = res.data;
        this.toast.success('Estudiante actualizado exitosamente', '', { positionClass: 'my-toast-position' });
      }
    });

    newStudentId.value = '';
    newFirstName.value = '';
    newLastName.value = '';
    newGroupId.value = '';
    newEnrollmentYear.value = '';
  }

  deleteStudent(event: Event, newStudentId: HTMLInputElement, newFirstName: HTMLInputElement,
    newLastName: HTMLInputElement, newGroupId: HTMLInputElement, newEnrollmentYear: HTMLInputElement) {
    event.preventDefault();

    const student: Student = {
      student_id: parseInt(newStudentId.value),
      first_name: newFirstName.value,
      last_name: newLastName.value,
      group_id: parseInt(newGroupId.value),
      enrollment_year: parseInt(newEnrollmentYear.value)
    };

    if (student.student_id) {
      this.apiService.delete(student).subscribe((res: Response) => {
        console.log(res);
        if (res.error) {
          alert('Error al eliminar el estudiante');
        } else {
          this.apiService.student = null;
          this.apiService.students = res.data;
          this.toast.success('Estudiante eliminado exitosamente', '', { positionClass: 'my-toast-position' });
        }
      });
    } else {
      this.toast.warning('Datos de estudiante inválidos', '', { positionClass: 'my-toast-position' });
    }

    newStudentId.value = '';
    newFirstName.value = '';
    newLastName.value = '';
    newGroupId.value = '';
    newEnrollmentYear.value = '';
  }

}
