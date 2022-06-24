/* eslint-disable camelcase */
import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  configure,
  localize,
  extend,
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import {
  required,
  max,
  min,
  email,
  length,
  confirmed,
  image,
  size,
} from 'vee-validate/dist/rules'

configure({
  bails: false,
})

extend('required', { ...required })
extend('max', { ...max })
extend('min', { ...min })
extend('length', { ...length })
extend('email', { ...email })
extend('image', { ...image })
extend('size', { ...size })
extend('confirmed', { ...confirmed })
extend('custom_password', {
  message: '半角英字、数字、記号を組み合わせて 8 文字以上で入力してください',
  validate: (value) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    return strongRegex.test(value)
  },
})
extend('custom_url_protocol', {
  message: '使用できるURLの形式は、http:、https:、tel:です',
  validate: (value) => {
    if (!value) return
    const isHttp = value.startsWith('http:')
    const isHttps = value.startsWith('https:')
    const isTel = value.startsWith('tel:')
    return isHttp || isHttps || isTel
  },
})

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
