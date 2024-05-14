import axios from 'axios';

export const useViaCepService = () => {
    const getAddress = async (cep: string) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;

            if (data.erro) {
                throw new Error('CEP não encontrado');
            }

            console.log(data);
            return data;
        } catch (error) {
            console.error('Erro ao buscar o endereço:', error);
            throw error;
        }
    };

    return { getAddress };
};
