// InfoBox.tsx
import React from 'react';

const InfoBox = ({ formData, onClose }: { formData: any; onClose: () => void }) => {
    return (
        <div className="info-box">
            <h2>Informações do Formulário</h2>
            <p>CEP: {formData.cep}</p>
            {/* Outras informações do formulário */}
            <button onClick={onClose}>Fechar</button>
        </div>
    );
};

export default InfoBox;
