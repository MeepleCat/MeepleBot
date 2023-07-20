## MeepleBot

### Summary
MeepleBot is a discord bot designed to facilitate the whitelisting of players on multiplayer servers through google sheets integration.
Currently the bot only works on one server but might eventually be expanded to work on others.

### Capabilities
* Google Sheets integration to automatically upload user's information to increase the ease of whitelisting.
* Easy to use and understand.
* Sends information messages periodically to ensure information about how to use the bot stays on top.

### Commands
* !MeepleBot whitelist {USERNAME}
    * Adds the user to the spreadsheet to be whitelisted.
* !MeepleBot notify
    * Pings all users who have been whitelisted since the last time the command was run.
* !MeepleBot reset
    * Sets everyone's status on the spreadsheet to not being whitelisted.
* !MeepleBot ignore
    * Stops all future commands from the server from being processed.
* !MeepleBot unignore
    * Undos the effects of !MeepleBot ignore
* !MeepleBot claim number {NUMBER}
    * Allows the user to claim an unique number
* !MeepleBot claimed numbers
    * Shows the currently claimed numbers
