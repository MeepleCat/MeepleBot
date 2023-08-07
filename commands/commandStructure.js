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
                required: true,
            }
        ]
    },
    {
        name: "change_username",
        description: "changes the username registered with the bot",
        type: 1,
        options: [
            {
                name: "new_username",
                description: "your new username",
                type: 3,
                required: true,
            }
        ]
    },
    // {
    //     name: "notify",
    //     description: "notifies all the people who have been whitelisted",
    //     type: 1,
    // },
    {
        name: "ping",
        description: "Hopefully replies with pong",
        type: 1,
    }, 
    {
        name: "bot_help",
        description: "Replies with a manual of all of the features of the bot",
        type: 1,
    },
    {
        name: "express_rage",
        description: "Express your rage towards the bot",
        type: 1,
    },
    {
        name: "diagnostics",
        description: "Bot status",
        type: 1,
    },
    {
        name: "ip_help",
        description: "A guide to help you connect to the server",
        type: 1,
    }
]
