import { ethers, parseUnits } from "ethers";

export async function POST(req, res) {
  const { data } = await req.json();
  try {
    const provider = new ethers.AlchemyProvider(
      process.env.NEXT_PUBLIC_NETWORK,
      process.env.NEXT_PUBLIC_ALCHEMY_KEY
      
    );

    const signer = new ethers.Wallet(data?.privateKey).connect(provider);
    const tx = await signer.sendTransaction({
      to: data?.to,
      value: parseUnits(data?.amount, "ether"),
    });

    const receipt = await tx.wait();
    return new Response(JSON.stringify({ status: true, data: receipt, hash: tx.hash }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: false,
        message: error.message || "Error sending transaction",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
