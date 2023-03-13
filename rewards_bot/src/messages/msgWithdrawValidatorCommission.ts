import { MsgWithdrawValidatorCommission } from "cosmjs-types/cosmos/distribution/v1beta1/tx";

import { validatorRewardSetup } from "..";

/**
 *
 */
export function getMsgWithdrawValidatorCommissionEncoded(chain: validatorRewardSetup) {
	return {
		typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
		value: MsgWithdrawValidatorCommission.encode(
			MsgWithdrawValidatorCommission.fromPartial({
				validatorAddress: chain.validatorAddress,
			}),
		).finish(),
	};
}
