import dotenv from "dotenv";

import { getMsgExec } from "./messages/msgExec";
import { getMsgWithdrawDelegatorRewardEncoded } from "./messages/msgWithdrawDelegatorReward";
import { getMsgWithdrawValidatorCommissionEncoded } from "./messages/msgWithdrawValidatorCommission";
import { getClients } from "./operator/clients";
export interface validatorRewardSetup {
	rpcUrl: string;
	prefix: string;
	gasprice: string;
	validatorAddress: string;
	operatorAddress: string;
}
dotenv.config();
const MNEMONIC: string = process.env.MNEMONIC ?? "";

const rewardChains: Array<validatorRewardSetup> = JSON.parse(process.env.CHAIN_SETUPS ?? "");

/**
 *
 */
async function main() {
	rewardChains.map((chain) => getRewards(chain));
}

/**
 *
 */
async function getRewards(chain: validatorRewardSetup) {
	const [cwClient, account] = await getClients(MNEMONIC, chain);

	const msgWithdrawDelegatorReward = getMsgWithdrawDelegatorRewardEncoded(chain);
	const msgWithdrawValidatorCommission = getMsgWithdrawValidatorCommissionEncoded(chain);
	const msgExec = getMsgExec(account.address, [msgWithdrawDelegatorReward, msgWithdrawValidatorCommission]);
	const res = await cwClient.signAndBroadcast(account.address, [msgExec], "auto", "withdrawRewardsBot");
	console.log(chain);
	console.log("used address: ", account.address);
	console.log(res.transactionHash);
}
main().catch((e) => {
	console.log(e);
	process.exit(1);
});
