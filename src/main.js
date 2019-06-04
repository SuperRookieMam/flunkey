// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {httpInstance, router} from './config'
import VueRouter from 'vue-router'
import VueCordova from 'vue-cordova'
import {AjaxPlugin} from './plugins'

Vue.config.productionTip = false

Vue.use(VueCordova)
Vue.use(VueRouter)
Vue.use({AjaxPlugin, httpInstance})

/*  Important Note: You DO NOT need Vue-Cordova to use Vue with Cordova
    or access Cordova plugins from Vue components.
    Vue-Cordova is a utility that makes the following plugins available in
     Vue components under Vue.cordova:
     重要提示:您不需要Vue-Cordova与Cordova一起使用Vue
     或者从Vue组件访问Cordova插件。
     Vue-Cordova是一个实用程序，它提供了以下插件
     Vue组件在Vue.cordova下：
     cordova-plugin-camera
     cordova-plugin-device
     cordova-plugin-geolocation
     cordova-plugin-contacts
     cordova-plugin-chrome-apps-sockets-tcp
     cordova-plugin-sms  */
Vue.use(VueCordova)
//  加载cordova.js 全局引用
var cordovaScript = document.createElement('script')
cordovaScript.setAttribute('type', 'text/javascript')
cordovaScript.setAttribute('src', 'cordova.js')
document.body.appendChild(cordovaScript)
//  加载cordova.js 全局引用
var myMedia = document.createElement('script')
myMedia.setAttribute('type', 'text/javascript')
myMedia.setAttribute('src', './plungins/cordovaMedia.js')
document.body.appendChild(myMedia)
/*  If you are using a different Cordova plugin you can access it directly
   from a Vue component from the window.cordova object & you can avoid this library entirely.
   For example, if you installed the barcode
   scanner plugin you could access its scan method in a Vue component like this:
   如果您正在使用一个不同的Cordova插件，您可以直接从窗口的Vue组件访问它。
   cordova对象&您可以完全避免这个库。例如，如果你安装了条形码扫描器插件，
   你可以像这样在Vue组件中访问它的扫描方法:  */
//  cordova.plugins.barcodeScanner.scan((result) => {console.log(result)}, (err) => {console.err(error)});

//   官方文文档地址http://kartsims.github.io/vue-cordova/#pluginssms
//  npm install -g ripple-emulator  调试工具
//  调试命令 ripple emulate
/* eslint-disable no-new */
document.addEventListener('deviceReady', new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
}), false)
