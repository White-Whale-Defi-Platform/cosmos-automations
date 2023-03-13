import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { stringToPath } from "@cosmjs/crypto/build/slip10";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";

import { validatorRewardSetup } from "..";
/**
 *
 */
export async function getClients(mnemonic: string, chain: validatorRewardSetup) {
	if (chain.prefix === "terra") {
		const hdPath = stringToPath(`m/44'/330'/0'/0/0`);
		const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
			prefix: chain.prefix,
			hdPaths: [hdPath],
		});
		// connect to client and querier
		const cwClient = await SigningCosmWasmClient.connectWithSigner(chain.rpcUrl, signer, {
			prefix: chain.prefix,
			gasPrice: GasPrice.fromString(chain.gasprice),
		});
		const accounts = await signer.getAccounts();
		return [cwClient, accounts[0]] as const;
	} else {
		const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
			prefix: chain.prefix,
		});
		// connect to client and querier
		const cwClient = await SigningCosmWasmClient.connectWithSigner(chain.rpcUrl, signer, {
			prefix: chain.prefix,
			gasPrice: GasPrice.fromString(chain.gasprice),
		});
		const accounts = await signer.getAccounts();
		return [cwClient, accounts[0]] as const;
	}
}
