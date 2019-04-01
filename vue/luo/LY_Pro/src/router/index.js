import Vue from 'vue'
import Router from 'vue-router'
// import taskAllocation from '@/components/taskAllocation'
// import dataShow from '@/components/dataShow'
import transfer from '@/components/transfer'

Vue.use(Router)

let router = new Router({
  routes: [
    // {
    //   path: '/taskAllocation',
    //   name: 'taskAllocation',
    //   component: taskAllocation
    // },
    // {
    //   path: '/dataShow',
    //   name: 'dataShow',
    //   component: dataShow
    // },
    {
      path: '*',
      name: 'transfer',
      component: transfer
    }
    // {
    //   path: '*',
    //   redirect: '/taskAllocation'
    // }
  ]
})

export default router
