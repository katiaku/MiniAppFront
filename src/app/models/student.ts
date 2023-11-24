export class Student {

  student_id: number;
  first_name: string;
  last_name: string;
  group_id: number;
  enrollment_year: number;

  constructor(student_id: number, first_name: string, last_name: string,
    group_id: number, enrollment_year: number) {
      this.student_id = student_id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.group_id = group_id;
      this.enrollment_year = enrollment_year
    }

}
