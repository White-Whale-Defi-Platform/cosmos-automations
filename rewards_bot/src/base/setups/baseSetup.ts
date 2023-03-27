import { FeeDistributorSetup } from "./feeDistributorSetup";
import { ValidatorRewardSetup } from "./validatorRewardSetup";

export interface BaseSetup {
	rpcUrl: string;
	prefix: string;
	gasprice: string;
	rewardSetup?: ValidatorRewardSetup;
	feeSetup?: FeeDistributorSetup;
}
