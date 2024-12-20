import Header from "@/component/header/header";
import Test from "@/component/test";
import styles from './home.module.css';  // Import the CSS module

export default function Home() {

  return (
    <>
      <div className={styles.container}>
            <video className={styles.backgroundVideo} autoPlay loop muted>
                <source src="/vid.mp4" type="video/mp4" />
            </video>
      </div>
    </>
  );
}
