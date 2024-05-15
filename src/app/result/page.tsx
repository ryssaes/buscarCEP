"use client"; 

import { useRouter } from 'next/navigation';
import styles from "../../styles/page.module.css"
import Link from 'next/link';

export default function Result() {

    return (
        <div className={styles.container}>
            <h1>Página de Resultado</h1>
            <Link href={"/"}>Voltar</Link>
        </div>
    );
}
