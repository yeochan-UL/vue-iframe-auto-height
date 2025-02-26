import { onMounted, onUnmounted } from 'vue';
// iframe의 내부 콘텐츠 높이에 따라 자동으로 높이를 조절하는 함수
export function useIframeAutoHeight(iframeRef) {
    let mutationObserver = null;
    // iframe의 높이를 업데이트하는 함수
    const updateHeight = () => {
        const iframe = iframeRef.value;
        // iframe과 iframe.contentDocument가 null이 아닌지 확인합니다.
        if (iframe && iframe.contentDocument !== null) {
            // 내부 문서의 body가 존재하는지도 확인합니다.
            if (iframe.contentDocument.body) {
                const newHeight = iframe.contentDocument.body.scrollHeight;
                iframe.style.height = newHeight + 'px';
            }
        }
    };
    onMounted(() => {
        const iframe = iframeRef.value;
        if (!iframe)
            return;
        // iframe이 로드되면 updateHeight 함수를 호출합니다.
        iframe.addEventListener('load', updateHeight);
        try {
            mutationObserver = new MutationObserver(updateHeight);
            // iframe 로드 시 내부 문서의 body에 observer 등록
            iframe.addEventListener('load', () => {
                try {
                    // contentDocument가 null이 아닌 경우에 observer를 등록합니다.
                    if (iframe.contentDocument !== null && iframe.contentDocument.body) {
                        mutationObserver?.observe(iframe.contentDocument.body, {
                            childList: true,
                            subtree: true,
                            attributes: true
                        });
                    }
                }
                catch (error) {
                    console.error('MutationObserver 설정 중 에러 발생:', error);
                }
            });
        }
        catch (error) {
            console.error('MutationObserver 생성 중 에러 발생:', error);
        }
    });
    onUnmounted(() => {
        const iframe = iframeRef.value;
        if (iframe) {
            iframe.removeEventListener('load', updateHeight);
        }
        if (mutationObserver) {
            mutationObserver.disconnect();
        }
    });
    return {
        updateHeight
    };
}
