import React from 'react';

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
        <div>
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
            {error && touched && <span>{error}</span>}
        </div>
    );
};

export default TextInput;
