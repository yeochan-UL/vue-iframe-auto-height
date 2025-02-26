// ResizeObserver를 사용하여 iframe 내부 콘텐츠 크기 변화를 감지
const observer = new ResizeObserver(() => {
    // 문서 전체의 높이(스크롤 높이)를 계산
    const height = document.documentElement.scrollHeight;
    
    // 부모 창(iframe을 포함한 페이지)으로 현재 높이를 전달
    window.parent.postMessage({ height }, "*");
});

// documentElement(HTML 요소)와 body 요소의 크기 변화를 감지하여 높이 업데이트
observer.observe(document.documentElement);
observer.observe(document.body);

// 페이지가 처음 로딩될 때 현재 높이를 부모 창에 전달하여 올바르게 표시되도록 설정
window.parent.postMessage({ height: document.documentElement.scrollHeight }, "*");
