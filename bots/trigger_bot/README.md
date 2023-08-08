# Trigger Bot

![Git2 (4)](https://user-images.githubusercontent.com/111542162/232131189-d50af0e4-3173-49be-a5de-3699fc839891.png)

[Discord invite]: https://discord.com/invite/tSxyyCWgYX
[Discord badge]: https://img.shields.io/discord/908044702794801233
[Twitter handle]: https://img.shields.io/twitter/follow/WhiteWhaleDefi.svg?style=social&label=Follow
[Twitter badge]: https://twitter.com/intent/follow?screen_name=WhiteWhaleDefi

Use this bot to trigger various actions in the cosmos: 
- Claim validator rewards
- Claim fees from smart contract

## Trigger a Claim of Validator Rewards

- Send all rewards to one place
- Never touch private validator key again to claim
- No need for binaries for everychain if you were to automate using CLI+binaries to claim

### Commands:  
Run these commands from your validator. 

To grant a wallet for claiming:  
```
$BINARY tx authz grant <claim_address> generic --msg-type=/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission --from <key-name>
$BINARY tx authz grant <claim_address> generic --msg-type=/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward --from <key-name>
```

To direct the rewards to a different wallet than the validator wallet:  
```
$BINARY tx distribution set-withdraw-addr <withdraw-addr> --from <key-name> --chain-id <chain-id> 
```

### Run Bot:

`Clone repo`

`apt install npm`

install newest nodeJS
```
VERSION=v18.15.0
DISTRO=linux-x64
mkdir -p /usr/local/lib/nodejs
cd /usr/local/lib/nodejs
wget https://nodejs.org/dist/v18.15.0/node-v18.15.0-linux-x64.tar.xz
tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 

VERSION=v18.15.0
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
. ~/.profile
node -v
```

copy the .env.example

`cp ~/cosmos-automations/bots/trigger_bot/.env.example .env`

`vim ~/cosmos-automations/bots/trigger_bot.env`

add mnemonic and replace the addresses with your own then :wq to save

`npm install`

`npm run build`

`node out/index.js`

## Schedule it


`mkdir -p ~/scripts/`  
`vim ~/scripts/start_script.sh`

```
#! /bin/bash
source $HOME/.bashrc

cd ~/cosmos-automations/bots/trigger_bot
export NODE_ENV=development
npm run build
```

`chmod +x start_script.sh `

`vim /etc/systemd/system/claim.service`

```
[Unit]
Description=validator claim

[Service]
Type=simple
User=$USER
ExecStart=/$USER/scripts/start_script.sh
Restart=on-failure
```
**note: either set USER to a value or replace user with the user you using**

`systemctl daemon-reload`  
`systemctl enable claim.service`  
`systemclt start claim.service`  

### Timer for 13:00:00 UTC everyday

`vim /etc/systemd/system/claim.timer`

```
[Unit]
Description=claim

[Timer]
OnCalendar=*-*-* 13:00:00 UTC

[Install]
WantedBy=multi-user.target
```

## Trigger a Claim of Smart Contract fees

Follow the steps above to get it set up. All you then need to do is add one line to the config.

Edit config
`vim ~/cosmos-automations/bots/trigger-bot/.env`

add something like this to the CHAIN_SETUPS
`{"rpcUrl":"https://rpc-whitewhale-testnet-xejdlrznpdaur7tp-ie.internalendpoints.notional.ventures:443", "prefix":"migaloo","gasprice":"0.015uwhale", "feeDistributorAddress":"migaloo1pl02gs047p84auvavwcawgfkehawv9vhgyndpyqyee796txelefq4np7kc"}`


## Contributing
If you would like to contribute to this repository, which is very much appreciated, make sure to check out the resources below. 
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
- [Contributing guide](./docs/CONTRIBUTING.md)
- [Security Policies and Procedures](./docs/SECURITY.md)
- [License](./LICENSE)
