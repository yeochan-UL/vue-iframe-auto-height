const vframe = {
  mounted(el) {
    // 메시지 핸들러 함수
    const adjustHeight = (event) => {
      if (event.data && event.data.height) {
        el.style.height = `${event.data.height}px`;
      }
    };

    // 부모 창이 postMessage를 받을 수 있도록 설정
    window.addEventListener("message", adjustHeight);

    // 나중에 제거할 수 있도록 이벤트 핸들러 저장
    el.__adjustHeight__ = adjustHeight;
  },

  updated(el) {
    // 기존 이벤트 리스너 제거 후 새로 등록
    window.removeEventListener("message", el.__adjustHeight__);

    const adjustHeight = (event) => {
      if (event.data && event.data.height) {
        el.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener("message", adjustHeight);
    el.__adjustHeight__ = adjustHeight;
  },

  unmounted(el) {
    // 컴포넌트가 사라질 때 이벤트 제거 (메모리 누수 방지)
    window.removeEventListener("message", el.__adjustHeight__);
  }
};


// Vue 3에서 글로벌로 사용할 수 있도록 플러그인으로 변환
const VframePlugin = {
  install(app) {
    app.directive("iframe", vframe); // v-iframe으로 등록
  }
};

export { vframe, VframePlugin };
export default vframe;
