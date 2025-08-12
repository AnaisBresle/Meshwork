import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      textAlign: 'center',
      padding: '15px 20px',
      marginTop: 'auto',
    }}> 
      <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;