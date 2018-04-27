<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-content-header">
        <div class="title">管理员登陆</div>
      </div>
      <el-form :model="ruleForm"  ref="ruleForm" label-width="0px" class="login-form-content">
        <el-form-item prop="email" class="form-item"  :class="{'is-error': isEmailError}">
          <el-input v-model="ruleForm.email" placeholder="电子邮件地址" size="large" auto-complete="off"
                    class="large-inp" @blur="handleEmailBlur" @focus="handleEmailFocus"></el-input>
          <div class="inp-error">{{emailErrorText}}</div>
        </el-form-item>
        <el-form-item prop="password" class="form-item" :class="{'is-error': isPasswordError}">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')" size="large" auto-complete="off" @blur="handlePasswordBlur" @focus="handlePasswordFocus"
                    class="large-inp"></el-input>
          <div class="inp-error">{{passwordErrorText}}</div>
        </el-form-item>
        <el-form-item class="login-btn-wrapper">
          <el-button type="primary" size="large" v-waves @click="submitForm('ruleForm')">{{submitDesc || '登录'}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex';

  import {
    LOGIN_API,
    SUCCESS_CODE
  } from '@/constsAlias';

  export default {
    computed: {
      isSending() {
        return this.submitDesc === '登录中...';
      }
    },
    data () {
      return {
        submitDesc: '',
        ruleForm: {
          password: '',
          email: ''
        },
        isEmailError: false,
        emailErrorText: '',
        isPasswordError: false,
        passwordErrorText: '',
        reg: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      }
    },
    methods: {
      ...mapMutations([
        'setTokenAndUsername'
      ]),
      validateEmail () {
        if (!this.ruleForm.email.trim()) {
          this.emailErrorText = '邮箱不能为空';
          this.isEmailError = true;
        } else {
          if (!this.reg.test(this.ruleForm.email.trim())) {
            this.emailErrorText = '邮箱格式不正确';
            this.isEmailError = true;
          }
        }
      },
      validatePassword () {
        if (!this.ruleForm.password.trim()) {
          this.passwordErrorText = '密码不能为空';
          this.isPasswordError = true;
        }
      },
      handleEmailBlur () {
        this.validateEmail()
      },
      handleEmailFocus () {
        this.isEmailError = false;
      },
      handlePasswordBlur () {
        this.validatePassword()
      },
      handlePasswordFocus () {
        this.isPasswordError = false;
      },
      submitForm() {
        const self = this;
        if (this.isSending) {
          return false;
        }
        this.validateEmail()
        this.validatePassword()
        if (this.isPasswordError || this.isEmailError) {
          return false;
        }
        this.submitDesc = '登录中...';
        self.$http.post(LOGIN_API, self.ruleForm).then((res) => {
          let result = res.body;
          this.submitDesc = '';
          if (result.code === SUCCESS_CODE) {
            self.setTokenAndUsername({
              tokenAndUsername: result.data
            });
            self.$router.push('/movieManage');
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login-wrapper
    background-color: #ffffff
    box-sizing border-box
    padding 40px 60px 40px 60px
    box-shadow: 0px 2.5px 32.5px 0 rgba(49, 57, 66, 0.1)
    .login-content-header
      .title
        display inline-block
        font-size: 18px
        font-weight: 500
        color: #323333
        padding 23px 0 9px
    .login-form-content
      .form-item
        position relative
        margin-top 15px
        margin-bottom 0
        .inp-error
          display none
        &.is-error
          .inp-error
            position absolute
            display block
            right 10px
            top 10px
            height 24px
            line-height 24px
            padding 0 10px
            border-radius 3px
            background #e75730
            color #ffffff
            font-size 12px
        .large-inp
          .el-input__inner
            height 45px
    .login-btn-wrapper
      padding 25px 0 1px
      .el-button--primary
         width 100%
         border-radius 99px
         background-image: linear-gradient(to right, #11a3f7, #2380e8)
         box-shadow: 0px 2.5px 7.5px 0 rgba(0, 0, 0, 0.2)
         span
           font-size: 16px
           font-weight: 500
           color: #ffffff
</style>
