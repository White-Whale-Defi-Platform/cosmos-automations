import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";

import { validatorRewardSetup } from "..";

/**
 *
 */
export function getMsgWithdrawDelegatorRewardEncoded(chain: validatorRewardSetup) {
	return {
		typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
		value: MsgWithdrawDelegatorReward.encode(
			MsgWithdrawDelegatorReward.fromPartial({
				/** Bech32 account address. */
				delegatorAddress: chain.operatorAddress,
				/** Bech32 account address. */
				validatorAddress: chain.validatorAddress,
			}),
		).finish(),
	};
}
