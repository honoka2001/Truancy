import Head from "next/head";
import Image from "next/image";
import App from "../components/App";
import styles from "../styles/Home.module.css";



export default function Home() {

  return (
    <div>
      <div className={styles.container}>
        <App />
      </div>
      <header className="header">
        <img src="/truancy_logo.svg" alt="logo" />
        <h1>Truancy</h1>
        <img src="/google_btn.png" alt="google_btn.png" />
      </header>
      <div className="main">
        <div className="contents">
          <img src="/Goal-bro.svg" alt="モチベーションを管理し物事の継続をサポート" />
          <h2>
            モチベーションを管理し<br />
            物事の継続をサポート
          </h2>
          <p>
            Truncyはあなたの日々の受験勉強やダイエットなどさまざまな努力を継続するために<br />
            あなたの努力を記録し管理して、サポートします。
          </p>
        </div>
        <div className="contents">
          <img src="/Blog post-bro.svg" alt="モチベーションを管理し物事の継続をサポート" />
          <h2>
            あなたの日々の努力を記録しよう
          </h2>
          <p>
            1コミットの定義を決めることが出来ます。<br />
            Ex. 数学 : テキストの大問１つで１コミット<br />
            また、一日の目標コミット数を設定でき、あなたの日々の努力を記録しましょう
          </p>
        </div>
        <div className="contents">
          <img src="/Analyze-amico.svg" alt="モチベーションを管理し物事の継続をサポート" />
          <h2>
            日々の記録から<br />
            あなたのモチベーションを可視化
          </h2>
          <p>
            目標コミット到達度、一定期間の平均コミット数、前日とのコミット数の差<br />
            からあなたのモチベーションを可視化します。<br />
            モチベーションのムラをなくし、努力を継続しましょう。
          </p>
        </div>
      </div>
      <footer>
        <h2>今すぐ始める</h2>
        <img src="/google_btn.png" alt="google_btn.png" />
      </footer>
    </div>
  );
}
