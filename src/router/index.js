import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import AlbumsList from '@/components/AlbumsList'
import EmployeeList from '@/components/EmployeeList'
import CustomerList from '@/components/CustomerList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/albums',
      name: 'Albums',
      component: AlbumsList
    },
    {
      path: '/employees',
      name: 'Employees',
      component: EmployeeList
    },
    {
      path: '/customers',
      name: 'Customers',
      component: CustomerList
    }
  ]
})
