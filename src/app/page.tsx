// Use a diretiva "use client" no início do arquivo
"use client";
import Image from "next/image";
import styles from "../styles/page.module.css"; 
import Form from '../components/Form/Form'; // Importe o componente correto

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Buscar Endereço pelo CEP</h1>
      <Form />
    </div>
  );
}
