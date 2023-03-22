# Autmated Validator Rewards Claim Bot

![Git2](https://user-images.githubusercontent.com/111542162/226931245-63a1e7ab-a4a7-4e22-8e80-1966b0a7ef43.png)


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)
[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
[![Discord badge][]][Discord invite]
[![Twitter handle][]][Twitter badge]
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6401/badge)](https://bestpractices.coreinfrastructure.org/projects/6401)

[Discord invite]: https://discord.com/invite/tSxyyCWgYX
[Discord badge]: https://img.shields.io/discord/908044702794801233
[Twitter handle]: https://img.shields.io/twitter/follow/WhiteWhaleDefi.svg?style=social&label=Follow
[Twitter badge]: https://twitter.com/intent/follow?screen_name=WhiteWhaleDefi

- Make automated claims on all your validators
- Send all to one place
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

`cp ~/validator-claim-bot/rewards_bot/.env.example .env`

`vim ~/validator-claim-bot/rewards_bot/.env`

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

cd /root/validator-claim-bot/rewards_bot
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
User=root
ExecStart=/root/scripts/start_script.sh
Restart=on-failure
```

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


## Contributing
If you would like to contribute to this repository, which is very much appreciated, make sure to check out the resources below. 
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
- [Contributing guide](./docs/CONTRIBUTING.md)
- [Security Policies and Procedures](./docs/SECURITY.md)
- [License](./LICENSE)
