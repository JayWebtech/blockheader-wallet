import { Wallet } from "ethers";

export async function GET(req, res) {
  try {
    const mnemonic = Wallet.createRandom().mnemonic.phrase;
    return  new Response(JSON.stringify({ status: true, phrase: mnemonic }),{
      status:200,
      headers:{ "Content-Type": "application/json" }
  })
  } catch (error) {
    return  new Response(JSON.stringify({ status: false, message: "Error generating seed phrase" }),{
      status:500,
      headers:{ "Content-Type": "application/json" }
  })
  }
}
