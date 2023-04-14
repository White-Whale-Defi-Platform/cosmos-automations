import { toUtf8 } from "@cosmjs/encoding";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

import { FeeDistributorSetup } from "../setups/feeDistributorSetup";

/**
 *
 */
export function getMsgNewEpoch(wallet: string, feeSetup: FeeDistributorSetup) {
	const newEpochMessage = { new_epoch: {} };
	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
		value: MsgExecuteContract.fromPartial({
			sender: wallet,
			contract: feeSetup.feeDistributorAddress,
			msg: toUtf8(JSON.stringify(newEpochMessage)),
			funds: [],
		}),
	};
}
