import React from 'react'
import { useEffect, useState } from "react";
import Cards from "./Cards";
import TextField from '@mui/material/TextField';
import styles from "./Search.module.css"
import LinearProgress from '@mui/material/LinearProgress';

export const Search = () => {
    // using useState hooks to store our data and update it later
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    // handle the onclick event of button 
    const handleClick = () => {
        setText("");
    }

    // fetching the data from API and making it asynchronous
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
    
    // this will run once after everything renders in the program and call the function to store the data.
    useEffect(() => {
      CoinDetails();
    }, []);

    // til the time data will not load the loading progress will be shown
    if (loading) {
      return (
                    <LinearProgress color="inherit" />
            )
        }
  
    return (
        <div className={styles.searchWrapper}>
            <div className={styles.search}>
                <h1 style={{fontFamily: "'Astloch', cursive"}} className={styles.bankerTag}><style>
                @import url('https://fonts.googleapis.com/css2?family=Astloch:wght@700&display=swap');
                </style>Banker
                </h1>
                <div className={styles.searchBox}>
                <h5>Select Display Currency</h5>
                <TextField fullWidth label="Search Currencies..." id="fullWidth" value={text}
                    size="small"
                    onChange={(e) => {
                    setText(e.target.value);
                    }}/>
                </div>
                <div className={styles.cardWrapper}>
                    {/* everytime the text will change this will filter out the coin name which contains same coin name as text*/}
                    {data
            ?.filter((item) => {
              if (text === "") {
                return item;
              } else if (
                item.coinName
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .includes(text.toLowerCase()) ||
                item.coinSymbol.toLowerCase().includes(text.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <Cards
                  keyId={item._id}
                  image={item.coinImage}
                  imgName={item.coinName}
                  price={item.usd_price}
                  name={item.coinName}
                />
                        )
                        }
                    )}
                </div>
            </div>
                        {/* this button will reset the text to an empty string and whole data will be shown again */}
                <button className={styles.resetBtn} onClick={handleClick}>Reset To USD</button>
        </div>
    )
}
