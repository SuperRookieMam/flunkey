// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {httpInstance, router} from './config'
import VueRouter from 'vue-router'
import {AjaxPlugin} from './plugins'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use({AjaxPlugin, httpInstance})

//  npm install -g ripple-emulator  调试工具
//  调试命令 ripple emulate
/* eslint-disable no-new */
document.addEventListener('deviceReady', function () {
  new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
  })
}, false)
