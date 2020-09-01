import Vue from 'vue'
import Router from 'vue-router'
//login
import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import Aside from '../components/tabs/Aside'
import Tabs from '../components/tabs/Tabs'
import IndexTools from '../components/home/IndexTools'
//manage
import KemuManage from '../components/manage/KemuManage'
import XuexiaoManage from '../components/manage/XuexiaoManage'
import JiaoshiManage from '../components/manage/JiaoshiManage'
import XueqiManage from '../components/manage/XueqiManage'
import YonghuManage from '../components/manage/YonghuManage'
import KaoshiManage from '../components/kaowu/KaoshiManage'
import SignupManage from '../components/manage/SignupManage'
//person
import PersonInfo from "../components/person/PersonInfo"
import PersonIP from "../components/person/PersonIP"
import PersonPassword from '../components/person/PersonPassword'
//docheck
import AllTaskList from '../components/docheck/AllTaskList'
import CreateTask from '../components/docheck/CreateTask'
import DoneLuruTask from '../components/docheck/DoneLuruTask'
import DoneShenheTask from '../components/docheck/DoneShenheTask'
import MyLuruTask from '../components/docheck/MyLuruTask'
import MyShenheTask from '../components/docheck/MyShenheTask'
//share
import NetDisk from '../components/share/NetDisk'
import NetDiskOfMine from '../components/share/NetDiskOfMine'
import NetDiskUpload from '../components/share/NetDiskUpload'
import NetDiskRecover from '../components/share/NetDiskRecover'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    //重定向让login成为默认首页
    {
      path: '/',
      redirect: '/login'
    },
    //下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Login
    },
    {
      path: '/tabs/aside',
      name: 'Aside',
      component: Aside,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/tabs/tabs',
      name: 'Tabs',
      component: Tabs,
      meta: {
        isLogin: true
      }
    },

    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        isLogin: true
      },
      children: [
        {
          path:'/indextools',
          name:'IndexTools',
          component: IndexTools,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/person/personinfo',
          name: 'PersonInfo',
          component: PersonInfo,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/person/personip',
          name: 'PersonIP',
          component: PersonIP,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/person/personpassword',
          name: 'PersonPassword',
          component: PersonPassword,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/manage/kemumanage',
          name: 'KemuManage',
          component: KemuManage,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/manage/xuexiaomanage',
          name: 'XuexiaoManage',
          component: XuexiaoManage,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/manage/jiaoshimanage',
          name: 'JiaoshiManage',
          component: JiaoshiManage,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/manage/xueqimanage',
          name: 'XueqiManage',
          component: XueqiManage,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/manage/yonghumanage',
          name: 'YonghuManage',
          component: YonghuManage,
          meta: {
            isLogin: true,
            level: 2
          }
        },
        {
          path: '/manage/signupmanage',
          name: 'SignupManage',
          component: SignupManage,
          meta: {
            isLogin: true,
            level: 2
          }
        },
        {
          path: '/kaowu/kaoshimanage',
          name: 'KaoshiManage',
          component: KaoshiManage,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/docheck/createtask',
          name: 'CreateTask',
          component: CreateTask,
          meta: {
            isLogin: true,
            level: 2
          }
        },
        {
          path: '/docheck/alltasklist',
          name: 'AllTaskList',
          component: AllTaskList,
          meta: {
            isLogin: true,
            level: 2
          }
        },
        {
          path: '/docheck/donelurutask',
          name: 'DoneLuruTask',
          component: DoneLuruTask,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/docheck/doneshenhetask',
          name: 'DoneShenheTask',
          component: DoneShenheTask,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/docheck/mylurutask',
          name: 'MyLuruTask',
          component: MyLuruTask,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/docheck/myshenhetask',
          name: 'MyShenheTask',
          component: MyShenheTask,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/share/netdisk',
          name: 'NetDisk',
          component: NetDisk,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/share/netdiskofmine',
          name: 'NetDiskOfMine',
          component: NetDiskOfMine,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/share/netdiskupload',
          name: 'NetDiskUpload',
          component: NetDiskUpload,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/share/netdiskrecover',
          name: 'NetDiskRecover',
          component: NetDiskRecover,
          meta: {
            isLogin: true
          }
        }
      ]
    }
  ]
});

