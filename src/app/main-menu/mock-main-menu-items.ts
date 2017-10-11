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
    icon: 'fa fa-window-restore',
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
    icon: 'fa fa-cogs',
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
    icon: 'fa fa-users',
    active: false,
    groupTitle : false,
    sub: '',
    routing: '/users',
    externalLink: '',
    budge: '',
    budgeColor: '#008000'
  },
  {
    title: 'Change Log',
    icon: 'fa fa-cogs',
    active: false,
    groupTitle : false,
    sub: '',
    routing: '/changelog',
    externalLink: '',
    budge: '',
    budgeColor: '#008000'
  },
  {
    title: 'Login History',
    icon: 'fa fa-cogs',
    active: false,
    groupTitle : false,
    sub: '',
    routing: '/loginhistory',
    externalLink: '',
    budge: '',
    budgeColor: '#008000'
  }
];
