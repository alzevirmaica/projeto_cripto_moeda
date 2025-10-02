import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";

interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCaUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
}

interface dataProp {
  data: CoinProps[];
}

function Home() {
  const [input, setInput] = useState("");
  const [coins, setcoins] = useState<CoinProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0", {
      headers: {
        Authorization:
          "Bearer 5649947b97ae6e773ac165d316c95ace1ff39dabdadd2f3d0ef602e66ca8a0f1",
      },
    })
      .then((response) => response.json())
      .then((data: dataProp) => {
        const coinsData = data.data;

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USd",
        });
        const formatedResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
          };
          return formated;
        });

        console.log(formatedResult);
      });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;

    navigate(`/detail/${input}`);
  }

  function handleGetMore() {
    alert("teste");
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... EX bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          <tr className={styles.tr}>
            <td className={styles.tdlabel} data-label="Moeda">
              <div className={styles.name}>
                <Link to={"/detail/bitcoin"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>

            <td className={styles.tdlabel} data-label="valor mercado">
              1T
            </td>

            <td className={styles.tdlabel} data-label="Preço">
              8.000
            </td>

            <td className={styles.tdlabel} data-label="Volume">
              2B
            </td>

            <td className={styles.tdProfit} data-label="Mudança 24h">
              <span>1.20</span>
            </td>
          </tr>
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Carregar mais...
      </button>
    </main>
  );
}

export default Home;
