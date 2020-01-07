/* tslint:disable:no-string-literal */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/shared/services/course.service';
import { Course } from 'src/app/shared/models/course';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course: Course = new Course();
  constructor(private courseService: CourseService) { }

  ngOnInit() { }

  createCourse(courseForm: NgForm) {
    courseForm.value['courseId'] = 'CRS_' + shortId.generate();
    courseForm.value['courseAdded'] = moment().unix();
    courseForm.value['ratings'] = Math.floor(Math.random() * 5 + 1);
    if (courseForm.value['courseImageUrl'] === undefined) {
      courseForm.value['courseImageUrl'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
    }

    courseForm.value['favourite'] = false;

    const date = courseForm.value['courseAdded'];

    this.courseService.createCourse(courseForm.value);

    this.course = new Course();

    $('#exampleModalLong').modal('hide');

    toastr.success('course ' + courseForm.value['courseName'] + 'is added successfully', 'Course Creation');
  }
}
/* tslint:disable:no-string-literal */
