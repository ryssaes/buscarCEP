"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useViaCepService, Endereco } from '../../services/api';
import TextInput from '../TextInput/TextInput';
import AddressField from '../AddressField/AddressField';
import InfoBox from '../InfoBox/InfoBox';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import Button from '../Button/Button';
import { validateCep, validateNumero, validateAlphabetic } from '../../utils/validation';
import styles from './Form.module.css';

const Form: React.FC = () => {
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
    const [showInfoBox, setShowInfoBox] = useState(false);
    const [formData, setFormData] = useState<any>(null);
    const [scrollToInfoBox, setScrollToInfoBox] = useState(false);
    const infoBoxRef = useRef<HTMLDivElement>(null);

    const validateField = (name: string, value: string) => {
        let errorMsg = '';
        if (name === 'cep') {
            if (!validateCep(value)) {
                errorMsg = 'CEP inválido. Deve conter 8 dígitos numéricos.';
            }
        } else if (name === 'numero') {
            if (!validateNumero(value)) {
                errorMsg = 'Número inválido. Deve conter apenas dígitos numéricos.';
            }
        } else if (name === 'rua' || name === 'bairro' || name === 'cidade' || name === 'estado') {
            if (!/^[^\d]+$/.test(value)) {
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
        if (newCep.length === 8 && validateCep(newCep)) {
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

        setFormData(data);
        setShowInfoBox(true);
        setScrollToInfoBox(true);
    };
    useEffect(() => {
        if (scrollToInfoBox && infoBoxRef.current) {
            infoBoxRef.current.scrollIntoView({ behavior: 'smooth' });
            setScrollToInfoBox(false);
        }
    }, [scrollToInfoBox]);


    return (
        <div className={styles.container}>
            <div className={`${styles.formContainer} `}>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="CEP"
                        name="cep"
                        value={cep}
                        onChange={handleCepChange}
                        onBlur={handleBlur}
                        error={erroCep || (errors.cep && touchedFields.cep && errors.cep)}
                        touched={touchedFields.cep}
                        aria-label="CEP"
                        aria-required={true}
                        aria-invalid={!!erroCep || (errors.cep && touchedFields.cep && errors.cep) ? 'true' : 'false'}
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
                        touched={touchedFields.rua}
                        aria-label="Rua ou logradouro"
                        aria-required={true}
                        aria-invalid={!!errors.rua && touchedFields.rua && errors.rua ? 'true' : 'false'}
                    />
                    <AddressField
                        label="Número"
                        name="numero"
                        value={endereco.numero}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        error={errors.numero && touchedFields.numero && errors.numero}
                        touched={touchedFields.numero}
                        aria-label="Número"
                        aria-required={true}
                        aria-invalid={!!errors.numero && touchedFields.numero && errors.numero ? 'true' : 'false'}
                    />

                    <AddressField
                        label="Complemento"
                        name="complemento"
                        value={endereco.complemento}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        error={errors.complemento && touchedFields.complemento && errors.complemento}
                    touched={touchedFields.complemento}
                    aria-label="Complemento"
                    aria-invalid={!!errors.complemento && touchedFields.complemento && errors.complemento ? 'true' : 'false'}
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
                        touched={touchedFields.bairro}
                        aria-label="Bairro"
                        aria-required={true}
                        aria-invalid={!!errors.bairro && touchedFields.bairro && errors.bairro ? 'true' : 'false'}
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
                        touched={touchedFields.cidade}
                        aria-label="Cidade"
                        aria-required={true}
                        aria-invalid={!!errors.cidade && touchedFields.cidade && errors.cidade ? 'true' : 'false'}
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
                        touched={touchedFields.estado}
                        aria-label="Estado"
                        aria-required={true}
                        aria-invalid={!!errors.estado && touchedFields.estado && errors.estado ? 'true' : 'false'}
                    />
                    <AddressField
                        label="País"
                        name="pais"
                        value={endereco.pais}
                        disabled
                        readOnly
                        onChange={() => { }}
                        onBlur={() => { }}
                        aria-label="País"
                        aria-required={false}
                        aria-invalid="false"
                    />

                    <Button type="submit" disabled={!isFormValid} className={styles.submitButton} onClick={() => { }}>
                        Enviar
                    </Button>
                    <FormErrorMessage endereco={endereco} />
                </form>
            </div>
            {showInfoBox && formData && (
                <div ref={infoBoxRef}>
                    <InfoBox
                        formData={formData}
                        onClose={() => setShowInfoBox(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default Form;

