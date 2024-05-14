import React, { useState } from 'react';
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

    const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCep = event.target.value;
        setCep(newCep);
        if (newCep.length === 8) {
            try {
                const data = await getAddress(newCep);
                console.log('Dados da API:', data); // Adiciona console.log aqui
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
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Reúne os dados do formulário
        const formData = {
            cep,
            ...endereco
        };

        try {
            // Envia os dados para a API ou para onde for necessário
            const response = await fetch('/sua-rota-de-backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                // Faça algo após o envio dos dados, como exibir uma mensagem de sucesso
                console.log('Dados enviados com sucesso!');
            } else {
                // Trate o erro de alguma forma, como exibindo uma mensagem de erro
                console.error('Erro ao enviar dados:', response.statusText);
            }
        } catch (error) {
            // Trate o erro de alguma forma, como exibindo uma mensagem de erro
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>CEP</label>
                <input type="text" name="cep" value={cep} onChange={handleCepChange} />
                {erroCep && <span>{erroCep}</span>}
            </div>
            <div>
                <label>Rua/Logradouro</label>
                <input type="text" name="rua" value={endereco.rua} readOnly={cep.length === 8} onChange={handleInputChange} required />
            </div>
            <div>
                <label>Número</label>
                <input type="text" name="numero" value={endereco.numero} onChange={handleInputChange} required />
            </div>
            <div>
                <label>Complemento</label>
                <input type="text" name="complemento" value={endereco.complemento} onChange={handleInputChange} />
            </div>
            <div>
                <label>Bairro</label>
                <input type="text" name="bairro" value={endereco.bairro} readOnly={cep.length === 8} onChange={handleInputChange} required />
            </div>
            <div>
                <label>Cidade</label>
                <input type="text" name="cidade" value={endereco.cidade} readOnly={cep.length === 8} onChange={handleInputChange} required />
            </div>
            <div>
                <label>Estado</label>
                <input type="text" name="estado" value={endereco.estado} readOnly={cep.length === 8} onChange={handleInputChange} required />
            </div>
            <div>
                <label>País</label>
                <input type="text" name="pais" value={endereco.pais} readOnly required />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};


export default Form;
