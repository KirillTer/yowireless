import { MainMenuItem } from './main-menu-item';

export const MAINMENUITEMS: MainMenuItem[] = [
  // {
  //   title: 'Main',
  //   icon: '',
  //   active: true,
  //   groupTitle : true,
  //   sub: '',
  //   routing: '',
  //   externalLink: '',
  //   budge: '',
  //   budgeColor: ''
  // },
  {
    title: 'Dashboards',
    icon: 'fa fa-th',
    active: false,
    groupTitle: false,
    sub: '',
    routing: '/dashboard',
    externalLink: '',
    budge: '',
    budgeColor: '#f44236'
  },
  {
    title: 'Settings',
    icon: 'fa fa-th',
    active: false,
    groupTitle : false,
    sub: '',
    routing: '/settings',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  {
    title: 'Users',
    icon: 'fa fa-calendar',
    active: false,
    groupTitle : false,
    sub: '',
    routing: '/users',
    externalLink: '',
    budge: '',
    budgeColor: '#008000'
  }
];
