module.exports = {
  dbs:'mongodb://127.0.0.1:27017/student',
  redis:{
    get host(){
      return '127.0.0.1'
    },
    get port(){
      return 6379
    }
  },
  mysql:{
    get database(){
      return 'lesson_project'
    },
    get username(){
      return 'root'
    },
    get password(){
      return 'lfj945051'
    },
    get port(){
      return '3306'
    },
    get host(){
      return 'localhost'
    }
  },
  smtp:{
    get host(){
      return 'smtp.qq.com'
    },
    get user(){
      return '543877815@qq.com'
    },
    get pass(){
      return 'hiqbztfhjqambbjd'
    },
    get code(){
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire(){
      return ()=>{
        return new Date().getTime()+60*60*1000
      }
    }
  }
}
