import React from 'react';
import './WrapperForm.css';

interface WrapperFormProps {
  children: React.ReactNode;
  image?: React.ReactNode;
}

const WrapperForm: React.FC<WrapperFormProps> = ({ children, image }) => (
  <div className="container">
    {children}
    <div className="login-image-container">
      {image}
    </div>
  </div>
);

export default WrapperForm;