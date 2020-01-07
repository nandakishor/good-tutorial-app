import { TranslateService } from 'src/app/shared/services/translate.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-best-course',
  templateUrl: './best-course.component.html',
  styleUrls: ['./best-course.component.css']
})
export class BestCourseComponent implements OnInit {
  bestCourses: Course[] = [];
  options: any;
  loading = false;
  constructor(
    private courseService: CourseService,
    private toasterService: ToastrService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        '0': { items: 1, margin: 5 },
        '430': { items: 2, margin: 5 },
        '550': { items: 3, margin: 5 },
        '670': { items: 4, margin: 5 }
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true
    };
    this.getAllCourses();
  }

  getAllCourses() {
    this.loading = true;
    const x = this.courseService.getCourses();
    x.snapshotChanges().subscribe(
      (course) => {
        this.loading = false;
        this.bestCourses = [];
        for (let i = 0; i < 5; i++) {
          const y = course[i].payload.toJSON();
          y['$key'] = course[i].key;
          this.bestCourses.push(y as Course);
        }
        // course.forEach(element => {
        //   const y = element.payload.toJSON();
        //   y["$key"] = element.key;
        //   this.bestCourses.push(y as Course);
        // });
      },
      (error) => {
        this.toasterService.error('Error while fetching Courses', error);
      }
    );
  }
}
