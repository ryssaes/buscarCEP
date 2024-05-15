import styles from "../styles/page.module.css"; 
import Form from '../components/Form/Form';

export default function Home() {

  return (
    <div className={styles.container}>
      <h1>Buscar Endereço pelo CEP</h1>
      <Form />
    </div>
  );
}
