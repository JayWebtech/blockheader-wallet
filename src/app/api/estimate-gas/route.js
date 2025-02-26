import { ethers, parseUnits } from "ethers";

export async function POST(req, res) {
  const { data } = await req.json();
  console.log(data)
  try {
    const provider = new ethers.JsonRpcProvider("https://0417-129-222-206-107.ngrok-free.app/", "holesky");

    console.log(data);

    const amount = ethers.parseUnits(data?.amount, "ether");

    const estimatedGas = await provider.estimateGas({
      from: data?.account,
      to: data?.to,
      value: amount,
    });

    const feeData = await provider.getFeeData();

    const txnGas = {
      estimatedGas: estimatedGas.toString(),
      gasPrice: ethers.formatUnits(feeData.gasPrice, "gwei"),
      maxFeePerGas: ethers.formatUnits(feeData.maxFeePerGas || "0", "gwei"),
      maxPriorityFeePerGas: ethers.formatUnits(
        feeData.maxPriorityFeePerGas || "0",
        "gwei"
      ),
      estimatedCostInEth: ethers.formatUnits(
        estimatedGas * feeData.gasPrice,
        "ether"
      ),
    };
    return new Response(JSON.stringify({ status: true, data: txnGas }), {
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
