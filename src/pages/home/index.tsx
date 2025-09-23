import Button from '../../components/button/Button';
import styles from './styles.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Button text="Primary Button" />
        
        <Button 
          text="Button with Icon"
          variant="withIcon" 
          iconRight={
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}