import { HDNodeWallet } from "ethers";

export async function POST(req, res) {
    const { data,index } = await req.json();
  try {
    const path = `m/44'/60'/0'/0/${index}`;

    const wallet_account = HDNodeWallet.fromPhrase(data, "", path);

    const walletData = {
      index: "0",
      address: wallet_account.address,
      privateKey: wallet_account.privateKey,
    };

    return  new Response(JSON.stringify({ status: true, data: walletData }),{
      status:200,
      headers:{ "Content-Type": "application/json" }
  })
  } catch (error) {
    return  new Response(JSON.stringify({ status: false, message: "Error generating account" }),{
      status:500,
      headers:{ "Content-Type": "application/json" }
  })
  }
}
