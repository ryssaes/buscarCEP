// Button.js
import React from 'react';
import './Button.module.css';

const Button = ({ onClick, children, type, disabled, className }) => {
    return (
        <button onClick={onClick} type={type} disabled={disabled} className={className}>
            {children}
        </button>
    );
};

export default Button;
