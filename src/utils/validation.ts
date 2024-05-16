// utils/validation.ts

export const validateCep = (cep: string): boolean => {
    return /^\d{8}$/.test(cep);
};

export const validateNumero = (numero: string): boolean => {
    return /^\d+$/.test(numero);
};

export const validateAlphabetic = (value: string) => {
    return /^[^\d]+$/.test(value); 
};

