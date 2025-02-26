# 📢 vue-iframe-auto-height

Vue 3에서 `iframe`의 높이를 자동으로 조절하는 커스텀 디렉티브(`v-auto-height`)

## ✨ 특징
- Vue 공식 가이드(Custom Directives) 방식 적용
- `iframe` 내부 콘텐츠 크기 변경 시 자동으로 부모 페이지 높이 조절
- `ResizeObserver`를 사용하여 반응형 지원
- 단일 디렉티브로 사용 가능 (`v-auto-height`)
- `iframe` 내부에서 실행할 `child-script.js` 제공
- 메모리 누수 방지를 위한 `unmounted` 훅 적용

---

## 📌 설치 방법

```bash
npm install vue-iframe-auto-height
```

---

## 🚀 사용법

### **1️⃣ 부모 페이지 (Vue 컴포넌트에서 `iframe` 높이 자동 조절)**

```vue
<template>
  <div>
    <h1>Vue 3 Iframe Auto Height</h1>
    <!-- v-auto-height 디렉티브를 사용하여 iframe 높이가 자동 조절됩니다. -->
    <iframe v-auto-height src="/child.html" frameborder="0" width="100%"></iframe>
  </div>
</template>

<script>
import { createApp } from "vue";
// npm 패키지 설치 후 사용합니다.
import { useIframeAutoHeight } from 'vue-iframe-auto-height/useIframeAutoHeight';

const app = createApp({});
// v-auto-height 커스텀 디렉티브를 전역에 등록합니다.
app.use(VframePlugin);
app.mount("#app");
</script>

```

### **2️⃣ `iframe` 내부 페이지 (높이 자동 감지 및 전송)**

`iframe` 내부에서 크기를 감지하고 부모 페이지로 전송해야 합니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iframe Child</title>
</head>
<body>
  <h2>Iframe 내부 페이지</h2>
  <p>이 페이지의 높이는 자동으로 조절됩니다.</p>

  <script type="module">
    import "vue-iframe-auto-height/child-script"; // 높이 자동 조절 기능 실행
  </script>
</body>
</html>
```

## 📌 패키지 업데이트 및 배포

```bash
npm version patch  # 1.1.0 → 1.1.1
npm publish
```

---

## 📌 라이선스
이 프로젝트는 **MIT 라이선스**를 따릅니다. 자유롭게 사용하세요! ⓒ 찬찬잉 🚀
