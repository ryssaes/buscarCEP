import React from 'react';
import TextInput from '../TextInput/TextInput';

interface AddressFieldProps {
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

const AddressField: React.FC<AddressFieldProps> = ({
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
        <TextInput
            label={label}
            name={name}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            error={error}
            touched={touched}
            aria-label={label}
            aria-invalid={touched && error ? 'true' : 'false'} 
        />
    );
};

export default AddressField;
