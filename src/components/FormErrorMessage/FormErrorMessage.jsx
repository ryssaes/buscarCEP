// FormErrorMessage.js
import React from 'react';
import styles from './FormErrorMessage.module.css';

const FormErrorMessage = ({ endereco }) => {
    const generateErrorMessage = () => {
        let errorMessage = '';
        const fieldsToCheck = [
            { name: 'rua', label: 'Rua/Logradouro' },
            { name: 'numero', label: 'Número' },
            { name: 'bairro', label: 'Bairro' },
            { name: 'cidade', label: 'Cidade' },
            { name: 'estado', label: 'Estado' }
        ];

        fieldsToCheck.forEach(({ name, label }) => {
            if (!endereco[name].trim()) {
                if (errorMessage.length > 0) {
                    errorMessage += ', ';
                }
                errorMessage += label;
            }
        });

        if (errorMessage.length > 0) {
            errorMessage = `Por favor, preencha o(s) seguinte(s) campo(s): ${errorMessage}`;
        }

        return errorMessage;
    };

    return (
        <p className={styles.errorMsg}>{generateErrorMessage()}</p>
    );
};

export default FormErrorMessage;
