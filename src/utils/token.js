// 获取token值
export const getToken = () => {
  return window.localStorage.getItem('token')
}

// 设置token值
export const setToken = token => {
  window.localStorage.setItem('token', 'Bearer ' + token)
}

// 删除token值
export const removeToken = () => {
  window.localStorage.removeItem('token')
}
