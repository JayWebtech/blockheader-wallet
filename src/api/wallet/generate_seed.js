import { Wallet } from "ethers";

export default function handler(req, res) {
  try {
    const mnemonic = Wallet.createRandom().mnemonic.phrase;
    res.status(200).json({ status: true, phrase: mnemonic });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error generating mnemonic:" });
  }
}
