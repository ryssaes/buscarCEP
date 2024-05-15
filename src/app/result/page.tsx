"use client"; // Use a diretiva "use client" no início do arquivo

// Importe o hook useRouter de 'next/navigation'
import { useRouter } from 'next/navigation';
import styles from "../../styles/page.module.css";

export default function Result() {
    // Inicialize o hook useRouter
    const router = useRouter();

    // Lógica adicional, se necessário

    return (
        <div className={styles.container}>
            <h1>Página de Resultado</h1>
            {/* Conteúdo da página de resultado */}
        </div>
    );
}
