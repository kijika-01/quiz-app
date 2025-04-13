import React from 'react';
import { Link } from 'react-router-dom';  

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f0f0f0',
      padding: '1rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p>
        <Link to="/privacy" style={{ margin: '0 1rem' }}>プライバシーポリシー</Link>
        <Link to="/contact" style={{ margin: '0 1rem' }}>お問い合わせ</Link>
      </p>
    </footer>
  );
};

export default Footer;
