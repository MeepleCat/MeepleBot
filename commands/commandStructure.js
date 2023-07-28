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
        name: "change_username",
        description: "changes the username registered with the bot",
        type: 1,
        options: [
            {
                name: "new_username",
                description: "your new username",
                type: 3,
            }
        ]
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
            },
            {
                name: "thruster",
                description: "number of packagers to put on your thruster",
                type: 4,
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
