import CreateWallet from "./create-wallet"


export async function getServerSideProps() {
    const res = await fetch(`/api/generate_seed.js`)
    const data = await res.json()

    return <CreateWallet data = {data} />
  }
