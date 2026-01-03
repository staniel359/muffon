import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  components: {
    BaseIcon
  },
  data () {
    return {
      isShowPassword: false
    }
  },
  computed: {
    passwordToggleIcon () {
      if (this.isShowPassword) {
        return 'passwordHide'
      } else {
        return 'passwordShow'
      }
    },
    fieldType () {
      if (this.isShowPassword) {
        return 'text'
      } else {
        return 'password'
      }
    }
  },
  methods: {
    handlePasswordToggleIconClick () {
      this.toggleIsShowPassword()
    },
    toggleIsShowPassword () {
      this.isShowPassword = !this.isShowPassword
    }
  }
}
