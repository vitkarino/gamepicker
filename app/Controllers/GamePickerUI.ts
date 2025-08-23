export class GamePickerUI {

    public searchUser(query: string) : void {
        if (query.includes("steamcommunity.com")) {
            this.searchUserByProfileUrl(query);
            }
        else {
            this.searchUserById(query)
            }
        }

    private searchUserByProfileUrl(sUrl: string) : void {
        const url = new URL(sUrl);
        const vanity = url.pathname.split('/')[2];
        fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${this.STEAM_API_KEY}&steamids=${vanity}`, {
            method: 'GET',
            })
            .then(response =>
                response.json()
                )
            .then(data => {
                if (data.response.steamid) {
                    this.STEAM_ID_64 = data.response.steamid;
                    this.searchUserById(this.STEAM_ID_64);
                    }
                else {
                    console.error("User not found:", data);
                    }
                })
            .catch(error =>
                console.error('Error fetching player summaries:', error)
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
                const player = data.response.players[0];
                console.log("User found:", player);
                })
            .catch(err =>
                console.error("Error fetching player summaries:", err)
                );
        }
    }