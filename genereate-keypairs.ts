import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`✅ public : ${keypair.publicKey.toBase58()}`);
console.log(`✅ private : ${keypair.secretKey}`);