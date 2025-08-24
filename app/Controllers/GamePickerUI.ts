export class GamePickerUI {

    private timeoutId       : number | undefined;
    private timeoutDuration : number = 1000;

    public user = reactive ({
        id          : '',
        name        : '',
        avatar      : '',
        });

    public searchUser(query: string) : void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            }

        this.timeoutId = window.setTimeout(() => {
            if (query.includes("steamcommunity.com")) {
                this.searchUserByProfileUrl(query);
                }
            else {
                this.searchUserById(query)
                }
            }, this.timeoutDuration);
        }

    private searchUserByProfileUrl(sUrl: string) : void {
        const url = new URL(sUrl);
        const vanity = url.pathname.split('/')[2];
        fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${this.STEAM_API_KEY}&vanityurl=${vanity}`, {
            method: 'GET',
            })
            .then(res =>
                res.json()
                )
            .then(data => {
                fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${this.STEAM_API_KEY}&steamids=${data.response.steamid}`, {
                    method: 'GET',
                    })
                    .then(response =>
                        response.json()
                        )
                    .then(data => {
                        const player = data.response.players[0];

                        if (player) {
                            this.user.name   = player.personaname;
                            this.user.id     = player.steamid;
                            this.user.avatar = player.avatarfull; // or avatarmedium / avatar depending on size you want
                            }
                        })
                    .catch(err =>
                        console.error("Error fetching player summaries!", err)
                        );
                })
            .catch(err =>
                console.error("Can't find a user with specified Steam ID!:", err)
                );
        }

    private searchUserById(steamId: string) : void {
        fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${this.STEAM_API_KEY}&vanityurl=${steamId}`, {
            method: 'GET',
            })
            .then(res =>
                res.json()
                )
            .then(data => {
                fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${this.STEAM_API_KEY}&steamids=${data.response.steamid}`, {
                    method: 'GET',
                    })
                .then(response =>
                    response.json()
                    )
                .then(data => {
                    const player = data.response.players[0];

                    if (player) {
                        this.user.name   = player.personaname;
                        this.user.id     = player.steamid;
                        this.user.avatar = player.avatarfull;


                        console.log(this.user);}
                    })
                .catch(err =>
                    console.error("Error fetching player summaries!", err)
                    );
                })
            .catch(err =>
                console.error("Can't find a user with specified Steam ID!:", err)
                );
        }
    }