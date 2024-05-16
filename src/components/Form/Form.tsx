"use client";
import React, { useState, useEffect } from 'react';
import { useViaCepService, Endereco } from '../../services/api';
import TextInput from '../TextInput/TextInput';
import AddressField from '../AddressField/AddressField';
import InfoBox from '../InfoBox/InfoBox';
import styles from './Form.module.css'; // Usando CSS Modules

const Form = () => {
    const { getAddress } = useViaCepService();
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState<Endereco>({
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: 'Brasil'
    });
    const [erroCep, setErroCep] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [touchedFields, setTouchedFields] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [showInfoBox, setShowInfoBox] = useState(false); // Estado para controlar a exibição da caixa de informações
    const [formData, setFormData] = useState<any>(null); // Estado para armazenar os dados do formulário submetido

    const validateField = (name: string, value: string) => {
        let errorMsg = '';
        if (name === 'cep') {
            if (!/^\d{8}$/.test(value)) {
                errorMsg = 'CEP inválido. Deve conter 8 dígitos numéricos.';
            }
        } else if (name === 'numero') {
            if (!/^\d+$/.test(value)) {
                errorMsg = 'Número inválido. Deve conter apenas dígitos numéricos.';
            }
        } else if (name === 'rua' || name === 'bairro' || name === 'cidade' || name === 'estado') {
            if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                errorMsg = 'Este campo deve conter apenas letras.';
            } else if (!value.trim()) {
                errorMsg = 'Este campo é obrigatório';
            }
        }
        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: errorMsg
        }));
        return errorMsg === '';
    };

    const validateForm = () => {
        let isValid = true;
        Object.keys(endereco).forEach((key) => {
            if (key !== 'complemento' && !validateField(key, (endereco as any)[key])) {
                isValid = false;
            }
        });
        setIsFormValid(isValid);
    };

    useEffect(() => {
        validateForm();
    }, [endereco]);

    const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCep = event.target.value;
        setCep(newCep);
        validateField('cep', newCep);
        if (newCep.length === 8 && /^\d{8}$/.test(newCep)) {
            try {
                const data = await getAddress(newCep);
                console.log('Dados da API:', data);
                setEndereco(data);
                setErroCep('');
            } catch (error) {
                setEndereco({
                    rua: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    pais: 'Brasil'
                });
                setErroCep('CEP não encontrado');
            }
        } else {
            setEndereco({
                rua: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                pais: 'Brasil'
            });
            setErroCep('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEndereco((prevState) => ({
            ...prevState,
            [name]: value
        }));
        if (touchedFields[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTouchedFields((prevState: any) => ({
            ...prevState,
            [name]: true
        }));
        validateField(name, value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTouchedFields({
            cep: true,
            rua: true,
            numero: true,
            complemento: true,
            bairro: true,
            cidade: true,
            estado: true,
            pais: true
        });
        validateForm();

        const data = {
            cep,
            ...endereco
        };

        setFormData(data); // Armazenar os dados do formulário submetido
        setShowInfoBox(true); // Mostrar a caixa de informações
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.formContainer} ${showInfoBox ? styles.moveLeft : ''}`}>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="CEP"
                        name="cep"
                        value={cep}
                        onChange={handleCepChange}
                        onBlur={handleBlur}
                        error={erroCep || (errors.cep && touchedFields.cep && errors.cep)}
                    />
                    <AddressField
                        label="Rua/Logradouro"
                        name="rua"
                        value={endereco.rua}
                        disabled={cep.length !== 8 || !!erroCep}
                        readOnly={cep.length === 8 && !erroCep}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        error={errors.rua && touchedFields.rua && errors.rua}
                    />
                    <AddressField
                        label="Número"
                        name="numero"
                        value={endereco.numero}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        error={errors.numero && touchedFields.numero && errors.numero}
                    />

                    <AddressField
                        label="Complemento"
                        name="complemento"
                        value={endereco.complemento}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        error={errors.complemento && touchedFields.complemento && errors.complemento}
                    />

                    <AddressField
                        label="Bairro"
                        name="bairro"
                        value={endereco.bairro}
                        disabled={cep.length !== 8 || !!erroCep}
                        readOnly={cep.length === 8 && !erroCep}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        error={errors.bairro && touchedFields.bairro && errors.bairro}
                    />

                    <AddressField
                        label="Cidade"
                        name="cidade"
                        value={endereco.cidade}
                        disabled={cep.length !== 8 || !!erroCep}
                        readOnly={cep.length === 8 && !erroCep}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        error={errors.cidade && touchedFields.cidade && errors.cidade}
                    />

                    <AddressField
                        label="Estado"
                        name="estado"
                        value={endereco.estado}
                        disabled={cep.length !== 8 || !!erroCep}
                        readOnly={cep.length === 8 && !erroCep}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        error={errors.estado && touchedFields.estado && errors.estado}
                    />
                    <button className={styles.submitButton} type="submit" disabled={!isFormValid}>
                        Enviar
                    </button>
                </form>
            </div>
            {showInfoBox && formData && (
                <div className={styles.infoBox}>
                    <InfoBox
                        formData={formData}
                        onClose={() => setShowInfoBox(false)} // Função para fechar a caixa de informações
                    />
                </div>
            )}
        </div>
    );
};

export default Form;
