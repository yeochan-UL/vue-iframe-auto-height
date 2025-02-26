import { App } from 'vue'
import iframeAutoHeightDirective from './directive'

// 이 플러그인은 Vue 애플리케이션에 v-iframe-auto-height 디렉티브를 전역 등록할 수 있도록 합니다.
export default {
  // Vue 플러그인은 install 메소드를 가집니다.
  install(app: App) {
    // 디렉티브를 'iframe-auto-height' 이름으로 등록합니다.
    app.directive('iframe-auto-height', iframeAutoHeightDirective)
  }
}
