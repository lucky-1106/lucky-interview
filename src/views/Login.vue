<template>
  <div class="login">
    <van-nav-bar left-arrow left-text="返回" @click-left="$router.back()"></van-nav-bar>
    <van-divider
      content-position="left"
      :style="{
        color: '#888',
        borderColor: '#888'
      }"
      >您好，请先登录</van-divider
    >
    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="loginForm.mobile"
        type="tel"
        name="手机"
        label="手机"
        colon
        left-icon="phone-circle"
        placeholder="请输入手机"
        :rules="[
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: '请填写正确的手机号',
            trigger: 'onBlur'
          }
        ]"
      />
      <van-row gutter="10">
        <van-col span="18">
          <van-field
            v-model="loginForm.code"
            name="验证码"
            label="验证码"
            colon
            left-icon="youzan-shield"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
        </van-col>
        <van-col span="6">
          <!-- native-type="button" 使点击表单中的普通按钮不触发表单提交 -->
          <van-button
            native-type="button"
            plain
            type="info"
            style="width: 100%"
            @click="getCode"
            :disabled="isDisabled"
            >{{ codeMsg }}</van-button
          >
        </van-col>
      </van-row>
      <p class="agreeText">
        登录即同意<a
          href="https://app.mockplus.cn/app/WAjoRHxy1/specs/design/uA_Ey4wFSj"
          target="_blank"
          >《用户使用协议》</a
        >和<a
          href="https://www.showdoc.com.cn/819963065638973?page_id=4744074055296227"
          target="_blank"
          >《隐私协议》</a
        >
      </p>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getCode, userLogin } from '@/plugins/http'
import { setToken } from '@/utils/token'
export default {
  created () {},
  data () {
    return {
      // 登录表单信息
      loginForm: {
        mobile: '18888888888',
        code: ''
      },
      // 验证码提示
      codeMsg: '验证码',
      // 验证码获取倒计时
      count: 5,
      // 验证码按钮禁用状态
      isDisabled: false
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    // 获取验证码
    getCode () {
      this.$refs.loginForm
        .validate('手机')
        .then(async () => {
          const res = await getCode(this.loginForm)
          // console.log(res)
          this.$toast.success(res.data)
          this.loginForm.code = res.data
          // 验证码获取倒计时
          this.isDisabled = true
          const timer = setInterval(() => {
            this.codeMsg = this.count + 'S'
            this.count--
            if (this.count === -1) {
              this.count = 5
              this.codeMsg = '验证码'
              this.isDisabled = false
              clearInterval(timer)
            }
          }, 1000)
        })
        .catch(err => {
          this.$toast.fail(err.message)
        })
    },
    // 提交表单登录
    onSubmit () {
      this.$refs.loginForm
        .validate()
        .then(async () => {
          const res = await userLogin(this.loginForm)
          // console.log(res)
          this.setUserInfo(res.data.user)
          setToken(res.data.jwt)
          this.$router.push('/main/user')
        })
        .catch(err => {
          this.$toast.fail(err.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  font-size: 20px;
  .van-form {
    padding: 20px 10px;
    .agreeText {
      margin: 20px 5px 50px;
      font-size: 12px;
      a {
        color: #1989fa;
      }
    }
  }
}
</style>
