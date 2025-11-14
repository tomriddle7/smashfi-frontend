"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import likeStar from "@/public/star-golden.svg";
import dislikeStar from "@/public/star-grey.svg";
import likeArrow from "@/public/arrow-blue.svg";
import dislikeArrow from "@/public/arrow-grey.svg";

function fnum(x: number) {
  if (x < 1000000) {
    return x.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "USD",
    });
  } else if (x < 1000000000) {
    return "$" + (x / 1000000).toFixed(2) + "M";
  } else if (x < 1000000000000) {
    return "$" + (x / 1000000000).toFixed(2) + "B";
  } else if (x < 1000000000000000) {
    return "$" + (x / 1000000000000).toFixed(2) + "T";
  } else if (x < 1000000000000000000) {
    return "$" + (x / 1000000000000000).toFixed(2) + "Q";
  }
}
const addNoti = () => toast.success("Successfully added!");
const deleteNoti = () => toast.success("Successfully deleted!");

const List = ({ list }: { list: any[] }) => {
  const [allCoinList, setAllCoinList] = useState<any[]>(list || []);
  const [myCoinData, setMyCoinData] = useState<any[]>([]);
  const [coinList, setCoinList] = useState<any[]>(list || []);
  const [value, setValue] = useState("");
  const [tab, setTab] = useState(0);
  const [order, setOrder] = useState({
    key: "current_price",
    value: -1,
  });

  useEffect(() => {
    setMyCoinData(JSON.parse(localStorage.getItem("my-coin") || "[]"));
  }, []);

  const changeTab = (val: number) => {
    setTab(val);
    switch (val) {
      case 0:
        setCoinList(allCoinList);
        break;
      case 1:
        setCoinList(list.filter((coin) => myCoinData.indexOf(coin.id) > -1));
        break;
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let tmpCoin: any[] = [];
    switch (tab) {
      case 0:
        tmpCoin = [...allCoinList];
        break;
      case 1:
        tmpCoin = [...list.filter((coin) => myCoinData.indexOf(coin.id) > -1)];
        break;
    }
    if (value.trim()) {
      const lowerValue = value.trim().toLowerCase();
      tmpCoin = tmpCoin.filter(
        (coin) =>
          coin.symbol.toLowerCase().includes(lowerValue) ||
          coin.name.toLowerCase().includes(lowerValue)
      );
    }
    setCoinList(tmpCoin);
  };

  return (
    <main className="container">
      <Toaster />
      <div className="header">
        <h1>Coin List</h1>
      </div>
      <div className="tabs">
        <button
          className={`tab-button ${tab === 0 && "active"}`}
          onClick={() => changeTab(0)}
        >
          All
        </button>
        <button
          className={`tab-button ${tab === 1 && "active"}`}
          onClick={() => changeTab(1)}
        >
          My favorite
        </button>
      </div>

      <form className="search-bar" onSubmit={onSubmit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search something...(BTC, Bitcoin, B...)"
          onChange={onChange}
          value={value}
        />
      </form>

      <section className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Price
                <Image
                  className={`sort-icon ${
                    order.key === "current_price" && order.value === 1 && "up"
                  }`}
                  src={order.key === "current_price" ? likeArrow : dislikeArrow}
                  alt="arrow"
                  onClick={() => {
                    if (order.key !== "current_price") {
                      setOrder({ key: "current_price", value: -1 });
                    } else {
                      setOrder({ ...order, value: order.value * -1 });
                    }
                  }}
                />
              </th>
              <th>
                24h Change
                <Image
                  className={`sort-icon ${
                    order.key === "price_change_percentage_24h" &&
                    order.value === 1 &&
                    "up"
                  }`}
                  src={
                    order.key === "price_change_percentage_24h"
                      ? likeArrow
                      : dislikeArrow
                  }
                  alt="arrow"
                  onClick={() => {
                    if (order.key !== "price_change_percentage_24h") {
                      setOrder({
                        key: "price_change_percentage_24h",
                        value: -1,
                      });
                    } else {
                      setOrder({ ...order, value: order.value * -1 });
                    }
                  }}
                />
              </th>
              <th>
                24h Volume
                <Image
                  className={`sort-icon ${
                    order.key === "total_volume" && order.value === 1 && "up"
                  }`}
                  src={order.key === "total_volume" ? likeArrow : dislikeArrow}
                  alt="arrow"
                  onClick={() => {
                    if (order.key !== "total_volume") {
                      setOrder({ key: "total_volume", value: -1 });
                    } else {
                      setOrder({ ...order, value: order.value * -1 });
                    }
                  }}
                />
              </th>
              <th>
                Market Cap
                <Image
                  className={`sort-icon ${
                    order.key === "market_cap" && order.value === 1 && "up"
                  }`}
                  src={order.key === "market_cap" ? likeArrow : dislikeArrow}
                  alt="arrow"
                  onClick={() => {
                    if (order.key !== "market_cap") {
                      setOrder({ key: "market_cap", value: -1 });
                    } else {
                      setOrder({ ...order, value: order.value * -1 });
                    }
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {coinList
              .toSorted(function (a, b) {
                return (a[order.key] - b[order.key]) * order.value;
              })
              .map((coin: any) => (
                <tr key={coin.id}>
                  <td>
                    <div className="coin-info">
                      <Image
                        className="star-icon"
                        src={
                          myCoinData.indexOf(coin.id) > -1
                            ? likeStar
                            : dislikeStar
                        }
                        alt="star"
                        onClick={() => {
                          let coinData = [...myCoinData];
                          const idx = coinData.indexOf(coin.id);
                          if (idx > -1) {
                            coinData.splice(idx, 1);
                            deleteNoti();
                          } else {
                            coinData.push(coin.id);
                            addNoti();
                          }
                          setMyCoinData(coinData);
                          localStorage.setItem(
                            "my-coin",
                            JSON.stringify(coinData)
                          );
                        }}
                      />
                      <img className="coin-icon" src={coin.image} />
                      <div className="coin-details">
                        <p className="coin-symbol">
                          {coin.symbol.toUpperCase()}
                          <em className="coin-name">{coin.name}</em>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="price-main">
                      {coin.current_price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div className="price-sub">
                      {coin.current_price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </td>
                  <td
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "change-positive"
                        : "change-negative"
                    }
                  >
                    <p>
                      {coin.price_change_percentage_24h >= 0 && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </td>
                  <td className="volume">{fnum(coin.total_volume)}</td>
                  <td className="market-cap">{fnum(coin.market_cap)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default List;
