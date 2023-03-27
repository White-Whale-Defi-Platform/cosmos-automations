import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { getMsgExec } from "../messages/msgExec";
import { getMsgWithdrawDelegatorRewardEncoded } from "../messages/msgWithdrawDelegatorReward";
import { getMsgWithdrawValidatorCommissionEncoded } from "../messages/msgWithdrawValidatorCommission";
import { ValidatorRewardSetup } from "../setups/validatorRewardSetup";

/**
 *
 */
export async function getValidatorRewards(
	cwClient: SigningCosmWasmClient,
	wallet: string,
	chain: ValidatorRewardSetup,
) {
	console.log("executing validator rewards");
	const msgWithdrawDelegatorReward = getMsgWithdrawDelegatorRewardEncoded(chain);
	const msgWithdrawValidatorCommission = getMsgWithdrawValidatorCommissionEncoded(chain);
	const msgExec = getMsgExec(wallet, [msgWithdrawDelegatorReward, msgWithdrawValidatorCommission]);
	const res = await cwClient.signAndBroadcast(wallet, [msgExec], "auto", "withdrawRewardsBot");
	console.log(chain);
	console.log("used address: ", wallet);
	console.log(res.transactionHash);
}
