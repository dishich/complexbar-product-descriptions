import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [productInput, setProductCode] = useState("");
  const [result, setResult] = useState();


  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setProductCode("");
  }

  return (
    <div>
      <Head>
        <title>Генератор описаний Комплекс-Бар</title>
        <link rel="icon" href="complexbar-logo.png" />
      </Head>

      <main className={styles.main}>
        <img src="/complexbar-logo.png" className={styles.icon} />
        <h3>Генератор описаний для товаров</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Введите артикул товара"
            value={productInput}
            onChange={(e) => setProductCode(e.target.value)}
          />
          <input type="submit" value="Создать описание" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>


     


    </div>

    
  );
}