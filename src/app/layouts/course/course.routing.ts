import { CartCoursesComponent } from './cart-courses/cart-courses.component';
import { FavouriteCoursesComponent } from './favourite-courses/favourite-courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

export const CourseRoutes: Routes = [
  {
    path: 'course',
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'all-courses',
        component: CourseListComponent
      },
      {
        path: 'favourite-courses',
        component: FavouriteCoursesComponent
      },
      {
        path: 'cart-items',
        component: CartCoursesComponent
      },
      {
        path: 'checkouts',
        loadChildren: './checkout/checkout.module#CheckoutModule'
      },
      {
        path: 'course/:id',
        component: CourseDetailComponent
      }
    ]
  }
];
