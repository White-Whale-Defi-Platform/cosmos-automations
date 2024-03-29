# Propy

![Git2 (3)](https://user-images.githubusercontent.com/111542162/230439615-5937dd0a-4945-4279-abbf-8950cfddf0d5.png)

[discord invite]: https://discord.com/invite/tSxyyCWgYX
[discord badge]: https://img.shields.io/discord/908044702794801233
[twitter handle]: https://img.shields.io/twitter/follow/WhiteWhaleDefi.svg?style=social&label=Follow
[twitter badge]: https://twitter.com/intent/follow?screen_name=WhiteWhaleDefi

- Never miss a vote!
- Other bots only alert of a new vote, this bot will alert you of votes you haven't made
- Simple setup


### Setup:

1. Clone this repo to a server you use for monitoring

2. Fill out config.json
example: 
```
{
  "slack":{
        "token":"<[youtube guide how to get token](https://www.youtube.com/watch?v=h94FK8h1OJU)",
        "channel":"#governance"
  },
  "chains":[
        {
           "name":"Chihuahua",
           "address":"chihuahua15tnycxe9csn7mkul4vvlyxlkd9jyqlw4ns0wgc",
           "endpoint":"<check cosmos.directory for public endpoint>"
        },
        {
         "name":"Injective",
         "address":"inj16gdnrnl224ylje5z9vd0vn0msym7p58fcf4cak",
         "endpoint":"<check cosmos.directory for public endpoint>"
        }
  ]
}
```


### Create Start Script

3. make directory for script:  
`mkdir -p ~/scripts/`  

4. create script:  
`vim ~/scripts/propy.sh`  
paste this in:  
```
#! /bin/bash
source $HOME/.bashrc

python3 /$USER/cosmos-automations/bots/propy/main.py --config /$USER/cosmos-automations/bots/propy/config.json --slack
```
_Note: either set USER to a value (ex. export USER=admin) or replace user with the user you using /admin/cosmos-automations or /root/cosmos-automations/_

5. make executable:  
`chmod +x start_script.sh `

6. create systemd service:  
`vim /etc/systemd/system/propy.service`
paste this in:  
```
[Unit]
Description=prop alerts

[Service]
Type=simple
User=$USER
ExecStart=/$USER/scripts/propy.sh
Restart=on-failure
```
_Note: either set USER to a value (ex. export USER=admin) or replace user with the user you using /admin/cosmos-automations or /root/cosmos-automations/_


7. Test run systemd service:  
`systemctl daemon-reload`  
`systemctl enable propy.service`   
`systemclt start propy.service`  


### Schedule with timer  

8. create systemd timer:  
`vim /etc/systemd/system/propy.timer`  

paste this in:  
```
[Unit]
Description=check for props

[Timer]
OnCalendar=*-*-* 13:00:00 UTC

[Install]
WantedBy=multi-user.target
```

9. start timer:  
`systemctl daemon-reload`  
`systemctl enable propy.timer`  
`systemclt start propy.timer`  


You're done! Now you should get alerts daily of the props you haven't yet voted on. 

## Contributing
If you would like to contribute to this repository, which is very much appreciated, make sure to check out the resources below. 
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
- [Contributing guide](./docs/CONTRIBUTING.md)
- [Security Policies and Procedures](./docs/SECURITY.md)
- [License](./LICENSE)

