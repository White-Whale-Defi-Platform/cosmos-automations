import { MsgWithdrawValidatorCommission } from "cosmjs-types/cosmos/distribution/v1beta1/tx";

import { ValidatorRewardSetup } from "../setups/validatorRewardSetup";

/**
 *
 */
export function getMsgWithdrawValidatorCommissionEncoded(chain: ValidatorRewardSetup) {
	return {
		typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
		value: MsgWithdrawValidatorCommission.encode(
			MsgWithdrawValidatorCommission.fromPartial({
				validatorAddress: chain.validatorAddress,
			}),
		).finish(),
	};
}
