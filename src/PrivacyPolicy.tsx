// src/pages/PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
<div style={{ padding: '2rem' }}>
  <h1>プライバシーポリシー</h1>
  <p>
    当サイトでは、広告配信やアクセス解析のために Cookie を使用することがあります。
    これらの情報は、個人を特定するものではなく、サイト改善や広告の最適化の目的で利用されます。
  </p>
  <p>
    当サイトでは、Google を含む第三者配信事業者が Cookie を使用し、ユーザーの興味に基づいた広告（パーソナライズ広告）を表示することがあります。
    Google広告に関する詳細や、Cookieの使用を無効にする方法については、
    <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">
      Googleの広告設定ページ
    </a>
    をご参照ください。
  </p>
  <p>
    ユーザーは、ブラウザの設定により Cookie の使用を無効にすることができます。
  </p>
</div>

  );
};

export default PrivacyPolicy;
