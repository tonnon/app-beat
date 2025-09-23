import Button from '../../components/button/Button';
import styles from './styles.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Button text="Quiz" />
      </div>
    </div>
  );
}