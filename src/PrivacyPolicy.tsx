// src/pages/PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '2rem' }}>
    <h1>プライバシーポリシー</h1>

    <p>
      当サイトでは、ユーザーの利便性向上や広告配信、アクセス解析のために Cookie（クッキー）を使用することがあります。Cookieは、個人を特定する情報を含まず、ユーザーの興味・関心に基づいたコンテンツの最適化に利用されます。
    </p>

    <h2>■ 広告について</h2>
    <p>
      当サイトでは、第三者配信事業者（Googleなど）が Cookie を使用し、ユーザーの過去のアクセス情報に基づいて広告（パーソナライズ広告）を表示する場合があります。
      <br />
      Google による広告配信は「Google広告設定」にて無効化が可能です。詳しくは以下をご参照ください：
      <br />
      <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">
        Google広告設定
      </a>
      <br />
      <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
        Googleのポリシーと規約
      </a>
    </p>

    <h2>■ アクセス解析について</h2>
    <p>
      当サイトでは、サイト改善のために Google アナリティクス等のアクセス解析ツールを利用することがあります。
      これにより収集されるデータも Cookie に基づいており、個人を特定する情報は含まれません。
    </p>

    <h2>■ お問い合わせについて</h2>
    <p>
      当サイトのお問い合わせフォームには Google フォームを使用しています。
      入力された内容は、当サイトの運営目的（お問い合わせ対応など）のみに使用し、第三者に提供することはありません。
    </p>

    <h2>■ Cookieの無効化について</h2>
    <p>
      ユーザーはブラウザの設定により Cookie の使用を拒否することができます。
      ただし、その場合、一部の機能が正常に動作しない可能性があります。
    </p>

    <h2>■ 免責事項</h2>
    <p>
      当サイトに掲載された内容については十分注意を払っておりますが、情報の正確性・安全性を保証するものではありません。
      当サイトを利用することで生じたトラブルや損失について、一切の責任を負いかねます。
    </p>
  </div>

  );
};

export default PrivacyPolicy;
