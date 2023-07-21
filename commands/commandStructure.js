export const commands = [
    {
        name: "whitelist",
        description: "Register for whitelist",
        type: 1,
        options: [
            {
                name: "username",
                description: "Your IGN",
                type: 3,
            }
        ]
    },
    {
        name: "ping",
        description: "Hopefully replies with pong",
        type: 1,
    }, 
    {
        name: "test_get_column",
        description: "For testing purposes",
        type: 1,
    },
    {
        name: "test_set_column",
        description: "For testing purposes",
        type: 1,
    },
    {
        name: "bot_help",
        description: "Replies with a manual of all of the features of the bot",
        type: 1,
    }
]