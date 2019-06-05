<template>
  <div id="wellcome">
    <img src="../../assets/logo.png" class="image">
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {MyMedia} from '../../plugins/cordovaPlugins/index'

  @Component({
    components: {
      // 注册主键
      //   topThemeTemplate: () => import('./components/HelloWorld')
    }
  })
  export default class App extends Vue {
    myMedia
    created () {
      this.myMedia = MyMedia.getMedia(cordova.file.applicationDirectory + 'www/voice/daji.mp3', () => {
        console.log('操作成功')
      }, () => {
        console.log('操作失败')
      })
      this.myMedia.play()
    }

    mounted () {
    }
    destroyed () {
      this.myMedia.stop()
      MyMedia.destroyMedia()
    }
  }
</script>

<style>
  .image {
    width: 100%;
    height: 100%;
  }
</style>
