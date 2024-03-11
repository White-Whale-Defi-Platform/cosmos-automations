import { QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { setupWasmExtension } from "@cosmjs/cosmwasm-stargate"

const migalooEndpoint = "https://migaloo-rpc.polkachu.com"
const ophirWhaleAddress = "migaloo1p5adwk3nl9pfmjjx6fu9mzn4xfjry4l2x086yq8u8sahfv6cmuyspryvyu"
const whaleUsdcAddress = "migaloo1xv4ql6t6r8zawlqn2tyxqsrvjpmjfm6kvdfvytaueqe3qvcwyr7shtx0hj"

async function main() {
    const tmClient = await Tendermint34Client.connect(migalooEndpoint)
    const querier = QueryClient.withExtensions(tmClient, setupWasmExtension);

    const ophirWhalePoolstate = await querier.wasm.queryContractSmart(ophirWhaleAddress, { pool: {} })
    const whaleUsdcPoolState = await querier.wasm.queryContractSmart(whaleUsdcAddress, { pool: {} })

    const ophirPrice = (ophirWhalePoolstate.assets[1].amount / ophirWhalePoolstate.assets[0].amount) * (whaleUsdcPoolState.assets[1].amount / whaleUsdcPoolState.assets[0].amount)
    console.log(ophirPrice)
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});