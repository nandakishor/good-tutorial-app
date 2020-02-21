/* tslint:disable:no-unused-variable */
import { Course } from '../../../../shared/models/course';
import { ShippingService } from '../../../../shared/services/shipping.service';
import { UserDetail, User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../../shared/services/course.service';
@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User;

  userDetail: UserDetail;

  courses: Course[];

  constructor(
    authService: AuthService,
    private shippingService: ShippingService,
    courseService: CourseService,
    private router: Router
  ) {
    /* Hiding courses Element */
    document.getElementById('coursesTab').style.display = 'none';
    document.getElementById('shippingTab').style.display = 'block';
    document.getElementById('coursesTab').style.display = 'none';
    document.getElementById('resultTab').style.display = 'none';

    this.userDetail = new UserDetail();
    this.courses = courseService.getLocalCartCourses();
    this.userDetails = authService.getLoggedInUser();
  }

  ngOnInit() { }

  updateUserDetails(form: NgForm) {
    const data = form.value;

    data['emailId'] = this.userDetails.emailId;
    data['userId'] = this.userDetails.$key;
    const courses = [];

    let totalPrice = 0;

    this.courses.forEach((course) => {
      delete course['$key'];
      totalPrice += course.coursePrice;
      courses.push(course);
    });

    data['courses'] = courses;

    data['totalPrice'] = totalPrice;

    data['shippingDate'] = Date.now();

    this.shippingService.createshippings(data);

    this.router.navigate(['checkouts', { outlets: { checkOutlet: ['billing-details'] } }]);
  }
}
/* tslint:disable:no-unused-variable */
