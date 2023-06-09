const routes = [
  {
    name:'login',
    path:'/login',
    component: () => import('./components/Login.vue')
  },
  { 
    name: 'home',
    path: '/',
    nav: true,
    component: () => import('./components/Home.vue')
  },
  { 
    name: 'users',
    path: '/users',
    nav: true,
    admin: true,
    component: () => import('./components/users/ListUsers.vue')
  },
  { 
    name: 'newUser',
    path: '/users/new',
    admin: true,
    component: () => import('./components/users/EditUser.vue')
  },
  { 
    name: 'editUser',
    path: '/users/:id',
    admin: true,
    component: () => import('./components/users/EditUser.vue')
  },
  { 
    name: 'organizations',
    path: '/organizations',
    nav: true,
    admin: true,
    component: () => import('./components/organizations/ListOrganizations.vue')
  },
  { 
    name: 'newOrganization',
    path: '/organizations/new',
    admin: true,
    component: () => import('./components/organizations/EditOrganization.vue')
  },
  { 
    name: 'editOrganization',
    path: '/organizations/:id',
    admin: true,
    component: () => import('./components/organizations/EditOrganization.vue')
  },
  { 
    name: 'meetings',
    path: '/meetings',
    nav: true,
    admin: true,
    component: () => import('./components/meetings/ListMeetings.vue')
  },
  { 
    name: 'my Meetings',
    path: '/mymeetings',
    nav: true,
    component: () => import('./components/meetings/ListMyMeetings.vue')
  },
  { 
    name: 'newMeeting',
    path: '/meetings/new',
    component: () => import('./components/meetings/EditMeetings.vue')
  },
  { 
    name: 'editMeeting',
    path: '/meetings/:id',
    component: () => import('./components/meetings/EditMeetings.vue')
  },
  { 
    name: 'notFound',
    path: "/:pathMatch(.*)*",
    component: () => import('./components/PageNotFound.vue')
  }
];


export default routes