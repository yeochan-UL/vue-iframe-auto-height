import vIframeAutosize from "./v-iframe-autosize";
import { useIframeAutoHeight } from "./useIframeAutoHeight";
import { App } from "vue";

const VframePlugin = {
  install(app: App) {
    app.directive("iframe-autosize", vIframeAutosize);
  }
};

export { VframePlugin, vIframeAutosize, useIframeAutoHeight };
export default VframePlugin;
