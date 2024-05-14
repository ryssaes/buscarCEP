import axios from 'axios';

export const useViaCepService = () => {
    const getAddress = async (cep: string) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // Requisição GET
            const data = response.data;

            if (data.erro) {
                throw new Error('CEP não encontrado'); // Se a resposta tiver algum erro
            }

            return data;
        } catch (error) {
            console.error('Erro ao buscar o endereço:', error); // Tratamento de erro
            throw error;
        }
    };

    return { getAddress };
};
