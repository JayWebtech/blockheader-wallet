import { ethers, parseUnits } from "ethers";

export async function POST(req, res) {
  const { data } = await req.json();
  try {
    const provider = new ethers.AlchemyProvider(
      process.env.NEXT_PUBLIC_ALCHEMY_KEY,
      process.env.NEXT_PUBLIC_NETWORK
    );

    const signer = new ethers.Wallet(data?.privateKey).connect(provider);
    const tx = await signer.sendTransaction({
      to: data?.to,
      value: parseUnits(data?.amount, "ether"),
    });

    //console.log(`https://${process.env.NEXT_PUBLIC_NETWORK}.etherscan.io/tx/${tx.hash}`);
    const receipt = await tx.wait();
    return new Response(JSON.stringify({ status: true, data: receipt }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ status: false, message: "Error sending tranaction" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
