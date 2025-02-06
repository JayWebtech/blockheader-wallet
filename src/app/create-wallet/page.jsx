import CreateWallet from "./createWallet"


export default async function Page() {
    const res = await fetch(`http://localhost:3000/api/wallet`)
    const data = await res.json();
    return <CreateWallet data={data} />
  }
