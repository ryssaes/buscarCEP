import React, { useState, useEffect } from 'react';
import { useViaCepService, Endereco } from '../../services/api';

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
        } else if (!value.trim() && name !== 'complemento') {
            errorMsg = 'Este campo é obrigatório';
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

        if (!isFormValid) {
            return;
        }

        const formData = {
            cep,
            ...endereco
        };

        try {
            const response = await fetch('/sua-rota-de-backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>CEP</label>
                <input
                    type="text"
                    name="cep"
                    value={cep}
                    onChange={handleCepChange}
                    onBlur={handleBlur}
                />
                {erroCep && <span>{erroCep}</span>}
                {errors.cep && touchedFields.cep && <span>{errors.cep}</span>}
            </div>
            <div>
                <label>Rua/Logradouro</label>
                <input
                    type="text"
                    name="rua"
                    value={endereco.rua}
                    readOnly={cep.length === 8}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.rua && touchedFields.rua && <span>{errors.rua}</span>}
            </div>
            <div>
                <label>Número</label>
                <input
                    type="text"
                    name="numero"
                    value={endereco.numero}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.numero && touchedFields.numero && <span>{errors.numero}</span>}
            </div>
            <div>
                <label>Complemento</label>
                <input
                    type="text"
                    name="complemento"
                    value={endereco.complemento}
                    onChange={handleInputChange}
                />
                {errors.complemento && touchedFields.complemento && <span>{errors.complemento}</span>}
            </div>
            <div>
                <label>Bairro</label>
                <input
                    type="text"
                    name="bairro"
                    value={endereco.bairro}
                    readOnly={cep.length === 8}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.bairro && touchedFields.bairro && <span>{errors.bairro}</span>}
            </div>
            <div>
                <label>Cidade</label>
                <input
                    type="text"
                    name="cidade"
                    value={endereco.cidade}
                    readOnly={cep.length === 8}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.cidade && touchedFields.cidade && <span>{errors.cidade}</span>}
            </div>
            <div>
                <label>Estado</label>
                <input
                    type="text"
                    name="estado"
                    value={endereco.estado}
                    readOnly={cep.length === 8}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                />
                {errors.estado && touchedFields.estado && <span>{errors.estado}</span>}
            </div>
            <div>
                <label>País</label>
                <input
                    type="text"
                    name="pais"
                    value={endereco.pais}
                    readOnly
                    required
                />
                {errors.pais && touchedFields.pais && <span>{errors.pais}</span>}
            </div>
            <button type="submit" disabled={!isFormValid}>Enviar</button>
        </form>
    );
};

export default Form;
