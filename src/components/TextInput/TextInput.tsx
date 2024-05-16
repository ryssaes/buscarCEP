import React from 'react';
import style from './TextInput.module.css'

interface TextInputProps {
    label: string;
    name: string;
    value: string;
    disabled?: boolean;
    readOnly?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
    touched?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    value,
    disabled = false,
    readOnly = false,
    onChange,
    onBlur,
    required = false,
    error,
    touched,
}) => {
    return (
        <div className={style.textInputContainer}>
            <label>{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
            />
            {error && touched && <span className={style.errorMessage}>{error}</span>}
        </div>
    );
};

export default TextInput;
