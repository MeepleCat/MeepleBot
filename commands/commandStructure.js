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
    {
        name: "notify",
        description: "notifies all the people who have been whitelisted",
        type: 1,
    },
    {
        name: "claim_number",
        description: "Allows you to claim a packager number",
        type: 1, 
        options: [
            {
                name: "shuttle",
                description: "number of packagers to put on your shuttle",
                type: 4,
                required: true,
            },
            {
                name: "thruster",
                description: "number of packagers to put on your thruster",
                type: 4,
                required: true,
            }
        ]
    },
    {
        name: "claimed_numbers",
        description: "Lists the claimed numbers",
        type: 1,
    },
    {
        name: "ping",
        description: "Hopefully replies with pong",
        type: 1,
    }, 
    {
        name: "bot_help",
        description: "Replies with a manual of all of the features of the bot",
        type: 1,
    }
]
