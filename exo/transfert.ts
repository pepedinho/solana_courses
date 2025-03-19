import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import "dotenv/config.js";

const inputKey = process.argv[2] || null;
if (!inputKey) {
    console.log("need argument")
    process.exit(1);
}

const senderKey = getKeypairFromEnvironment("SECRET_KEY_1");

const toPubkey = new PublicKey(inputKey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKey.publicKey,
    toPubkey,
    lamports: 5000,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKey,
]);

console.log(
    `💸 Finished! Sent 5000 Lamport to the address ${toPubkey}. `
);
console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );