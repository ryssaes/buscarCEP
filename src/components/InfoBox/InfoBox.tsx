import React from 'react';
import Style from './InfoBox.module.css';

const InfoBox = ({ formData, onClose }: { formData: any; onClose: () => void }) => {
    return (
        <div className={Style.infoboxcontainer}>
            <div className={Style.infobox}>
                <h2>Informações do Endereço</h2>
                <p>{formData.rua}, {formData.numero} - {formData.complemento || 'Sem complemento'}</p>
                <p>{formData.bairro} - {formData.cidade}, {formData.estado}</p>
                <p>{formData.cep}, {formData.pais}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default InfoBox;
