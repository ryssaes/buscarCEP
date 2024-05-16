import React from 'react';
import Style from './InfoBox.module.css';

const InfoBox = ({ formData, onClose }: { formData: any; onClose: () => void }) => {
    return (
        <div className={Style.infoboxcontainer} role="dialog" aria-labelledby="infobox-heading" aria-describedby="infobox-description">
            <div className={Style.infobox}>
                <h2 id="infobox-heading">Informações do Endereço</h2>
                <p id="infobox-description">{formData.rua}, {formData.numero} - {formData.complemento || 'Sem complemento'}</p>
                <p>{formData.bairro} - {formData.cidade}, {formData.estado}</p>
                <p>{formData.cep}, {formData.pais}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default InfoBox;
