import { Directive } from "vue";

const vIframeAutosize: Directive = {
  mounted(el: HTMLIFrameElement) {
    const adjustHeight = () => {
      try {
        const iframeDocument = el.contentDocument || el.contentWindow?.document;
        if (!iframeDocument) return;

        const body = iframeDocument.body;
        const html = iframeDocument.documentElement;
        const newHeight = Math.max(body.scrollHeight, html.scrollHeight);
        el.style.height = `${newHeight}px`;
      } catch (error) {
        console.warn("iframe 내부 접근이 제한되었습니다.", error);
      }
    };

    el.onload = adjustHeight;
  }
};

export default vIframeAutosize;
