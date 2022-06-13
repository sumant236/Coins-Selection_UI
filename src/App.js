import React from "react";
import "./index.css";
import { useEffect, useState } from "react";
import Cards from "./Components/Cards";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const CoinDetails = async () => {
    try {
      const data = await fetch(
        "https://comms.globalxchange.com/coin/vault/get/all/coins"
      );
      const result = await data.json();
      setData(result.coins);
      console.log(result.coins);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    CoinDetails();
  }, [data]);
  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="App">
      <div className="serchBox">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>

      {data
        ?.filter((item) => {
          if (text === "") {
            return item;
          } else if (
            item.coinName
              .toLowerCase()
              .split(" ")
              .join("")
              .includes(text.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item) => {
          return (
            <Cards
              image={item.coinImage}
              imgName={item.coinName}
              price={item.usd_price}
              name={item.coinName}
            />
          );
        })}
    </div>
  );
}
