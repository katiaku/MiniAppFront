import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/models/response';
import { SubjectsMarksService } from 'src/app/shared/subjects-marks.service';

@Component({
  selector: 'app-subjects-marks',
  templateUrl: './subjects-marks.component.html',
  styleUrls: ['./subjects-marks.component.css']
})
export class SubjectsMarksComponent {

  constructor(public apiService: SubjectsMarksService,
    private toast: ToastrService) {
    this.apiService.avgMark = null;
  }

  ngOnInit(): void {
    this.getAllEnrollmentInfo();
    this.getAllSubjectsTaught();
  }

  getAvgGrade(newStudentId: HTMLInputElement) {
    const studentId = parseInt(newStudentId.value);
    if (!isNaN(studentId)) {
        this.apiService.getAvgGrade(studentId).subscribe((res: Response) => {
            console.log(res.data);
            if (res.error) {
                this.toast.warning('El ID no se ha encontrado', '', { positionClass: 'my-toast-position' });
            } else {
                const avgValue = res[0]?.average;
                if (avgValue) {
                    console.log(avgValue);
                    this.apiService.avgMark = avgValue;
                } else {
                    this.toast.warning('No se puede calcular la nota media del estudiante', '', { positionClass: 'my-toast-position' });
                }
            }
        });
    } else {
        this.apiService.avgMark = null;
    }
  }

  getEnrollmentInfo(newStudentId: HTMLInputElement) {
    const studentId = parseInt(newStudentId.value);
    console.log(studentId)

    if (!isNaN(studentId)) {
      this.apiService.getEnrollmentInfo(studentId).subscribe((res: any) => {
        console.log(res);
        if (res.error || res.length <= 0) {
          this.toast.warning('El ID no se ha encontrado', '', {positionClass: 'my-toast-position'});
          this.getAllEnrollmentInfo();
        } else {
          this.apiService.student = res.data;
        }
      });
    } else {
      this.apiService.student = null;
    }
  }

  getAllEnrollmentInfo() {
    this.apiService.getAllEnrollmentInfo().subscribe((res: any) => {
      console.log(res);
      if (res.error || res.length <= 0)
        this.toast.warning('No hay información', '', {positionClass: 'my-toast-position'});
      else
        this.apiService.student = res;
    });
  }

  getSubjectsTaught(newTeacherId: HTMLInputElement) {
    const teacherId = parseInt(newTeacherId.value);
    console.log(teacherId)

    if (!isNaN(teacherId)) {
      this.apiService.getSubjectsTaught(teacherId).subscribe((res: any) => {
        console.log(res);
        if (res.error || res.length <= 0) {
          this.toast.warning('El ID no se ha encontrado', '', {positionClass: 'my-toast-position'});
          this.getAllSubjectsTaught();
        } else {
          this.apiService.teacher = res;
        }
      });
    } else {
      this.apiService.student = null;
    }
  }

  getAllSubjectsTaught() {
    this.apiService.getAllSubjectsTaught().subscribe((res: any) => {
      console.log(res);
      if (res.error || res.length <= 0)
        this.toast.warning('No hay información', '', {positionClass: 'my-toast-position'});
      else
        this.apiService.teacher = res;
    });
  }

}
