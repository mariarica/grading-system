const Welcome = () => import('~/pages/welcome').then(m => m.default || m)
const Login = () => import('~/pages/auth/login').then(m => m.default || m)
const Register = () => import('~/pages/auth/register').then(m => m.default || m)
const PasswordEmail = () => import('~/pages/auth/password/email').then(m => m.default || m)
const PasswordReset = () => import('~/pages/auth/password/reset').then(m => m.default || m)
const NotFound = () => import('~/pages/errors/404').then(m => m.default || m)
const RegisterSchool = () => import('~/pages/school/register').then(m => m.default || m)

const Home = () => import('~/pages/home').then(m => m.default || m)
const Settings = () => import('~/pages/settings/index').then(m => m.default || m)
const SettingsProfile = () => import('~/pages/settings/profile').then(m => m.default || m)
const SettingsPassword = () => import('~/pages/settings/password').then(m => m.default || m)
const Dashboard = () => import('~/pages/dashboard').then(m => m.default || m)

const schoolYear = () => import('~/pages/school/schoolYear').then(m => m.default || m)
const gradingPeriod = () => import('~/pages/school/gradingPeriod').then(m => m.default || m)
const schoolInfo = () => import('~/pages/school/info').then(m => m.default || m)
const schoolStudents = () => import('~/pages/school/students').then(m => m.default || m)
const schoolTeachers = () => import('~/pages/school/teachers').then(m => m.default || m)
const schoolCalenar = () => import('~/pages/school/calendar').then(m => m.default || m)


const gradeLevelList = () => import('~/pages/school/gradelevel/list').then(m => m.default || m)
const SectionList = () => import('~/pages/school/gradelevel/section/list').then(m => m.default || m)
const gradeLevelSubject = () => import('~/pages/school/gradelevel/subjects').then(m => m.default || m)
const gradeLevelStudents = () => import('~/pages/school/gradelevel/students').then(m => m.default || m)
const gradeLevelTeachers = () => import('~/pages/school/gradelevel/teachers').then(m => m.default || m)

const sectionStudents = () => import('~/pages/school/gradelevel/section/students').then(m => m.default || m)
const sectionSubjects = () => import('~/pages/school/gradelevel/section/subjects').then(m => m.default || m)

const teacherSections = () => import('~/pages/school/teacher/sections').then(m => m.default || m)
const teacherLessonPlans = () => import('~/pages/school/teacher/lessonPlans').then(m => m.default || m)
const teacherClasses= () => import('~/pages/school/teacher/classes').then(m => m.default || m)



export default [
  { path: '/', name: 'welcome', component: Welcome },

  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/password/reset', name: 'password.request', component: PasswordEmail },
  { path: '/password/reset/:token', name: 'password.reset', component: PasswordReset },
  { path: '/school/register', name: 'school.register', component: RegisterSchool },

  // { path: '/home', name: 'home', component: Home },
  { path: '/settings',
    name: 'Settings',
    component: {
      render (c) { return c('router-view') }
    },
    redirect: { name: 'Profile' },
    children: [
      { path: '', redirect: { name: 'Profile' } },
      { path: 'profile', name: 'Profile', component: SettingsProfile },
      { path: 'password', name: 'Password', component: SettingsPassword }
    ]
  },
  { 
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'calendar', name: 'Calendar', component: schoolCalenar, meta: { label: 'Calendar'}},
      {
        path: 'school/:school_id',
        name: 'School',
        meta: { label: 'School'} ,
        redirect: 'school/:school_id',
        component: {
          render (c) { return c('router-view') }
        },
        children: [
          { path: '', redirect: { name: 'School Information' } },
          { path: 'school-info', name: 'School Information', component: schoolInfo},
          { path: 'school-year', name: 'School Year', component: schoolYear},
          { path: 'grading-period', name: 'Grading Period', component: gradingPeriod },
          { path: 'students', component: schoolStudents, meta: { label: 'Students'}, props: true },
          { path: 'teachers', component: schoolTeachers, meta: { label: 'Teachers'}, props: true },
          { 
            path: 'grade-level', 
            redirect: 'grade-level',
            name: 'Grade Level',
            meta: { label: 'Grade Level'} ,
            props: true,
            component: {
              render (c) { return c('router-view') }
            },
            children: [
              { path: '', component: gradeLevelList },
              { 
                path: ':grade_level_id', 
                redirect: '/:grade_level_id/sections',
                props: true,
                component: {
                  render (c) { return c('router-view') }
                },
                children: [
                  { path: '', component: SectionList }, 
                  { path: 'subjects', component: gradeLevelSubject, meta: { label: 'Subjects'}, props: true}, 
                  { path: 'teachers', component: gradeLevelTeachers, meta: { label: 'Teachers'}, props: true },  
                  { path: 'students', component: gradeLevelStudents, meta: { label: 'Students'}, props: true },     
                  { 
                    path: 'sections', 
                    redirect: 'sections',
                    // component: SectionList, 
                    meta: { label: 'Sections'}, 
                    props: true,
                    component: {
                      render (c) { return c('router-view') }
                    },
                    children: [
                      { path: '', component: SectionList },
                      { 
                        path: ':section_id', 
                        redirect: '/:section_id/students',
                        props: true,
                        component: {
                          render (c) { return c('router-view') }
                        },
                        children: [
                          { path: '', component: sectionStudents }, 
                          { path: 'students', component: sectionStudents, meta: { label: 'Students'}, props: true}, 
                          { path: 'subjects', component: sectionSubjects, meta: { label: 'Subjects'}, props: true },  
                        ],
                      },         
                    ],
                  }
                ],
              },         
            ],
          },
        ],
      },
      { path: 'classes', component: teacherClasses, meta: { label: 'Classes'}},
      { path: 'sections', component: teacherSections, meta: { label: 'Sections'}},
      { path: 'class-records', component: teacherLessonPlans, meta: { label: 'Class Records'}},
    ]
  },

  { path: '*', component: NotFound, name: 'Not Found'}
]
