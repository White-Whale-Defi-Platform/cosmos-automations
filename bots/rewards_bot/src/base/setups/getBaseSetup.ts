import { BaseSetup } from "./baseSetup";
import { FeeDistributorSetup } from "./feeDistributorSetup";
import { ValidatorRewardSetup } from "./validatorRewardSetup";

/**
 *
 */
export function getBaseSetup(envs: NodeJS.ProcessEnv): Array<BaseSetup> {
	const rawSetup: Array<any> = JSON.parse(envs.CHAIN_SETUPS ?? "");
	const setups: Array<BaseSetup> = [];
	for (const setup of rawSetup) {
		const baseSetup: BaseSetup = { rpcUrl: setup.rpcUrl, prefix: setup.prefix, gasprice: setup.gasprice };
		if (setup["feeDistributorAddress" as keyof typeof setup]) {
			const feeSetupInput = <FeeDistributorSetup>setup;
			const feeSetup: FeeDistributorSetup = {
				feeDistributorAddress: feeSetupInput.feeDistributorAddress,
			};
			baseSetup.feeSetup = feeSetup;
		}
		if (setup["validatorAddress" as keyof typeof setup] && setup["operatorAddress" as keyof typeof setup]) {
			const rewardSetupInput = <ValidatorRewardSetup>setup;
			const rewardSetup: ValidatorRewardSetup = {
				validatorAddress: rewardSetupInput.validatorAddress,
				operatorAddress: rewardSetupInput.operatorAddress,
			};
			baseSetup.rewardSetup = rewardSetup;
		}
		setups.push(baseSetup);
	}
	return setups;
}
