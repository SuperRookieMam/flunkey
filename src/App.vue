<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import helloWord from './components/HelloWorld'

  @Component({
    components: {
      helloWord
      // 注册主键
      //   topThemeTemplate: () => import('./components/HelloWorld')
    }
  })
  export default class App extends Vue {
    created () {
      this.$router.push({name: 'login'})
    }

    mounted () {
      console.log('The App component mounted')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
