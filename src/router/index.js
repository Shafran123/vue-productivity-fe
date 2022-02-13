import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LandingView  from "../views/LandingView.vue";
import DashboardView  from "../views/DashboardView.vue";
import ProjectsView  from "../views/ProjectsView.vue";
import TasksView  from "../views/TasksView.vue";
import EmployeesView from "../views/EmployeesView.vue";
import SearchView from "../views/SearchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      beforeEnter: (to, form, next) => {
       let token = localStorage.getItem('token')
          if(token){
            return next({name: 'teams'})
          }else{
            next()
          }
    }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      children: [
        {
        path: 'teams',
        name: 'teams',
        component: ProjectsView,
      } ,
      {
        path: 'tasks',
        name: 'tasks',
        component: TasksView,
      },
      {
        path: 'employees',
        name: 'employees',
        component: EmployeesView,
      },
      {
        path: 'search',
        name: 'search',
        component: SearchView,
      },
    ]
    }
  ],
});

export default router;
