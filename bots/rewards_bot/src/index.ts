import dotenv from "dotenv";

import { getFeeRewards } from "./base/actions/getFeeRewards";
import { getValidatorRewards } from "./base/actions/getValidatorRewards";
import { getBaseSetup } from "./base/setups/getBaseSetup";
import { getClients } from "./operator/clients";

dotenv.config();
const MNEMONIC: string = process.env.MNEMONIC ?? "";
const setups = getBaseSetup(process.env);
/**
 *
 */
async function main() {
	for (const setup of setups) {
		const [cwClient, account] = await getClients(MNEMONIC, setup);
		console.log(setup);
		if (setup.feeSetup) {
			await getFeeRewards(cwClient, account.address, setup.feeSetup);
		}
		if (setup.rewardSetup) {
			await getValidatorRewards(cwClient, account.address, setup.rewardSetup);
		}
	}
}

main().catch((e) => {
	console.log(e);
	process.exit(1);
});
