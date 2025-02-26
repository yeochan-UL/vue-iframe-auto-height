// v-iframe-auto-height 디렉티브: iframe의 내부 콘텐츠 변화에 따라 높이를 자동 조절합니다.
const iframeAutoHeightDirective = {
    mounted(el) {
        // 높이 업데이트 함수
        const updateHeight = () => {
            // contentDocument가 null이 아닌지 확인합니다.
            if (el.contentDocument !== null && el.contentDocument.body) {
                const newHeight = el.contentDocument.body.scrollHeight;
                el.style.height = newHeight + 'px';
            }
        };
        el.__updateHeight__ = updateHeight;
        // iframe 로드 시 높이 업데이트 이벤트 등록
        el.addEventListener('load', updateHeight);
        // MutationObserver를 생성하여 내부 콘텐츠 변화를 감지합니다.
        const observer = new MutationObserver(updateHeight);
        el.__iframeAutoHeightObserver__ = observer;
        // iframe 로드 시 내부 문서의 body에 observer 등록
        el.addEventListener('load', () => {
            try {
                if (el.contentDocument !== null && el.contentDocument.body) {
                    observer.observe(el.contentDocument.body, {
                        childList: true,
                        subtree: true,
                        attributes: true
                    });
                }
            }
            catch (error) {
                console.error('iframe MutationObserver 등록 중 에러 발생:', error);
            }
        });
    },
    unmounted(el) {
        // 저장된 updateHeight 함수를 이용해 이벤트 제거
        el.removeEventListener('load', el.__updateHeight__);
        // 등록된 MutationObserver 해제
        if (el.__iframeAutoHeightObserver__) {
            el.__iframeAutoHeightObserver__.disconnect();
            delete el.__iframeAutoHeightObserver__;
        }
        delete el.__updateHeight__;
    }
};
export default iframeAutoHeightDirective;
