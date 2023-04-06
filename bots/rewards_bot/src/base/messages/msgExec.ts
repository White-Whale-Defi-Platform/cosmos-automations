/**
 *
 */
export function getMsgExec(wallet: string, msgs: Array<{ typeUrl: string; value: Uint8Array }>) {
	return {
		typeUrl: "/cosmos.authz.v1beta1.MsgExec",
		value: {
			grantee: wallet,
			msgs: msgs,
		},
	};
}
