import { ref, onMounted, watchEffect, nextTick } from "vue";

export function useIframeAutoHeight(iframeRef: any) {
  const adjustHeight = () => {
    if (!iframeRef.value) return;
    try {
      const iframe = iframeRef.value;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDocument) return;

      const body = iframeDocument.body;
      const html = iframeDocument.documentElement;
      const newHeight = Math.max(body.scrollHeight, html.scrollHeight);
      iframe.style.height = `${newHeight}px`;
    } catch (error) {
      console.warn("iframe 내부 접근이 제한되었습니다.", error);
    }
  };

  onMounted(() => {
    if (iframeRef.value) {
      iframeRef.value.onload = () => {
        nextTick(() => {
          adjustHeight();
        });
      };
    }
  });

  watchEffect(() => {
    adjustHeight();
  });
}
