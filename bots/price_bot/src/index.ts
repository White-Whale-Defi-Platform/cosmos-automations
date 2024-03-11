import { QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import { setupWasmExtension } from "@cosmjs/cosmwasm-stargate"
import dotenv from "dotenv"
import axios from "axios"

const migalooEndpoint = "https://migaloo-rpc.polkachu.com"
const ophirWhaleAddress = "migaloo1p5adwk3nl9pfmjjx6fu9mzn4xfjry4l2x086yq8u8sahfv6cmuyspryvyu"
const whaleUsdcAddress = "migaloo1xv4ql6t6r8zawlqn2tyxqsrvjpmjfm6kvdfvytaueqe3qvcwyr7shtx0hj"
let latestUpdateId = 0;

async function main() {
    const tmClient = await Tendermint34Client.connect(migalooEndpoint)
    const querier = QueryClient.withExtensions(tmClient, setupWasmExtension);
    dotenv.config({ path: "./src/env/.env" });
    const botTgToken = process.env.TELEGRAM_TOKEN;

    while (true) {
        const updates = await (await axios.get(`https://api.telegram.org/bot${botTgToken}/getUpdates`)).data
        const latestUpdate = updates.result[updates.result.length - 1]
        if (latestUpdate.update_id > latestUpdateId) {
            if (latestUpdate["message" as keyof typeof latestUpdate] !== undefined && latestUpdate.message.text === "/price") {
                const ophirWhalePoolstate = await querier.wasm.queryContractSmart(ophirWhaleAddress, { pool: {} })
                const whaleUsdcPoolState = await querier.wasm.queryContractSmart(whaleUsdcAddress, { pool: {} })
                const ophirPrice = Math.round((ophirWhalePoolstate.assets[1].amount / ophirWhalePoolstate.assets[0].amount) * (whaleUsdcPoolState.assets[1].amount / whaleUsdcPoolState.assets[0].amount) * 1e6) / 1e6
                const res = await axios.get(`https://api.telegram.org/bot${botTgToken}/sendMessage`, { params: { chat_id: -1001879293182, text: `${ophirPrice > 0.005 ? `🟢` : `🔴`}\t $OPHIR price: $${ophirPrice}` } });
                latestUpdateId = latestUpdate.update_id;
            }
        }
        await delay(1000);
    }

}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

/**
 *
 */
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}