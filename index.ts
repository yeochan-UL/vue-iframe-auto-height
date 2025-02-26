import { useIframeAutoHeight } from './src/useIframeAutoHeight'
import iframeAutoHeightDirective from './src/directive'
import plugin from './src/plugin'

// 개별적으로 사용할 수 있도록 Composable, Directive, Plugin을 export 합니다.
export {
  useIframeAutoHeight,
  iframeAutoHeightDirective,
  plugin
}

// 기본 내보내기로 플러그인을 설정합니다. Vue 애플리케이션에서 .use(plugin) 형태로 사용 가능.
export default plugin
