import List from "@/components/List";

async function getCoinList() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  const json = await res.json();
  return json;
}

export default async function Coin() {
  const coinList = await getCoinList();

  return <List list={coinList} />;
}
