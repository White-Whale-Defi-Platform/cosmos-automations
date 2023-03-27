import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { getMsgNewEpoch } from "../messages/msgNewEpoch";
import { FeeDistributorSetup } from "../setups/feeDistributorSetup";

/**
 *
 */
export async function getFeeRewards(cwClient: SigningCosmWasmClient, wallet: string, setup: FeeDistributorSetup) {
	console.log("executing fee rewards distribution");
	const msgFeeRewards = getMsgNewEpoch(wallet, setup);
	const res = await cwClient.signAndBroadcast(wallet, [msgFeeRewards], "auto", "feeDistroBot");
	console.log("used address: ", wallet);
	console.log(res.transactionHash);
}
