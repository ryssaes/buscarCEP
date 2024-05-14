import axios from 'axios';

export interface Endereco {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
}

export const useViaCepService = () => {
    const getAddress = async (cep: string): Promise<Endereco> => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;

            if (data.erro) {
                throw new Error('CEP não encontrado');
            }

            return {
                rua: data.logradouro || '',
                numero: '', // Você pode preencher o número conforme necessário
                complemento: '', // Você pode preencher o complemento conforme necessário
                bairro: data.bairro || '',
                cidade: data.localidade || '',
                estado: data.uf || '',
                pais: 'Brasil' // O país é fixo como Brasil
            };
        } catch (error) {
            console.error('Erro ao buscar o endereço:', error);
            throw error;
        }
    };

    return { getAddress };
};
