// InfoBox.tsx
import React from 'react';
import Style from './InfoBox.module.css'

const InfoBox = ({ formData, onClose }: { formData: any; onClose: () => void }) => {
    return (
        <div className={Style.infoboxcontainer}>
            <div className={Style.infobox}>
                <h2>Informações do Formulário</h2>
                <p><strong>CEP:</strong> {formData.cep}</p>
                <p><strong>Rua/Logradouro:</strong> {formData.rua}</p>
                <p><strong>Número:</strong> {formData.numero}</p>
                <p><strong>Complemento:</strong> {formData.complemento}</p>
                <p><strong>Bairro:</strong> {formData.bairro}</p>
                <p><strong>Cidade:</strong> {formData.cidade}</p>
                <p><strong>Estado:</strong> {formData.estado}</p>
                <p><strong>País:</strong> {formData.pais}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default InfoBox;
