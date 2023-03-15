# validator-claim-bot
Claim bot for wallet with authz claim permissions

### Commands:  

```
simd tx authz grant <claim_address> generic --msg-type=/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission --from validator
simd tx authz grant <claim_address> generic --msg-type=/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward --from validator
```
### Example Commands:

```
terrad tx authz grant <address of wallet you want to be able to vote> generic --msg-type=/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission --from validator  
terrad tx authz grant <address of wallet you want to be able to vote> generic --msg-type=/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward --from validator
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


mkdir -p ~/scripts/
vim ~/scripts/start_script.sh

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


