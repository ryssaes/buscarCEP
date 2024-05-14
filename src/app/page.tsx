// src/app/page.tsx

"use client";

import { useEffect } from 'react';
import { useViaCepService } from './services/api';
import styles from "./page.module.css";

export default function Home() {
  const { getAddress } = useViaCepService();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const cep = '01001000'; // Exemplo de CEP para teste
        const data = await getAddress(cep);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress();
  }, [getAddress]);

  return (
    <>
      {/* Outros elementos da página */}
    </>
  );
}
