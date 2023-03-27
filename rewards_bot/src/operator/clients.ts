import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { stringToPath } from "@cosmjs/crypto/build/slip10";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";

import { BaseSetup } from "../base/setups/baseSetup";

/**
 *
 */
export async function getClients(mnemonic: string, setup: BaseSetup) {
	if (setup.prefix === "terra") {
		const hdPath = stringToPath(`m/44'/330'/0'/0/0`);
		const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
			prefix: setup.prefix,
			hdPaths: [hdPath],
		});
		// connect to client and querier
		const cwClient = await SigningCosmWasmClient.connectWithSigner(setup.rpcUrl, signer, {
			prefix: setup.prefix,
			gasPrice: GasPrice.fromString(setup.gasprice),
		});
		const accounts = await signer.getAccounts();
		return [cwClient, accounts[0]] as const;
	} else {
		const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
			prefix: setup.prefix,
		});
		// connect to client and querier
		const cwClient = await SigningCosmWasmClient.connectWithSigner(setup.rpcUrl, signer, {
			prefix: setup.prefix,
			gasPrice: GasPrice.fromString(setup.gasprice),
		});
		const accounts = await signer.getAccounts();
		return [cwClient, accounts[0]] as const;
	}
}
