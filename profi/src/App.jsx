import React, { useState, useEffect } from "react";
import axios from "axios";
// Создайте этот файл для стилизации

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 6,
            page: 1,
            sparkline: true,
          },
        }
      );
      setCryptoData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the crypto data", error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000); // обновление данных каждую минуту
    return () => clearInterval(interval); // очистка интервала при размонтировании компонента
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="about">
            <th>Asset</th>
            <th className="price text">Price</th>
            <th className="change">Change</th>
            <th className="volume text">Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => (
            <tr key={crypto.id}>
              <td data-label="Asset" className="name-crypto">
                <img src={crypto.image} alt="" className="crypto-img" />{" "}
                {crypto.name} <span className="span-name">{crypto.name}</span>
              </td>
              <td data-label="Price" className="price">
                ${crypto.current_price.toFixed(2)}
              </td>
              <td
                data-label="Change (24h)"
                className={`change ${
                  crypto.price_change_percentage_24h > 0
                    ? "positive"
                    : "negative"
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(3)}%
              </td>
              <td data-label="Volume" className="volume">
                ${crypto.total_volume.toLocaleString()}
              </td>
              <td>
                <button className="Trade">Trade</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="assets">All assets</button>
    </div>
  );
};

export default App;
