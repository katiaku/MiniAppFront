export class Mark {

  mark_id: number;
  student_id: number;
  subject_id: number;
  date: Date;
  mark: number;

  constructor(mark_id: number, student_id: number, subject_id: number,
    date: Date, mark: number) {
      this.mark_id = mark_id;
      this.student_id = student_id;
      this.subject_id = subject_id;
      this.date = date;
      this.mark = mark
    }

}
