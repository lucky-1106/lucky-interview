import $http from '@/utils/request.js'

// 获取验证码 参数mobile(手机号)
export const getCode = ({ mobile }) => {
  return new Promise((resolve, reject) => {
    $http.post('/au/code', { mobile }).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// 登录 参数mobile&code(手机号和验证码)
export const userLogin = ({ mobile, code }) => {
  return new Promise((resolve, reject) => {
    $http.post('/au/login', { mobile, code }).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
