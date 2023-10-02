export const commands = [
    {
        name: "apply",
        description: "Apply to the astroneer whitelist",
        type: 1,
        options: [
            {
                name: "username",
                description: "Put your username here",
                type: 3,
                required: true,
            },
            {
                name: "game",
                description: "What game to view the queue of",
                type: 3,
                required: true,
                choices: [
                    {
                       name: "astroneer",
                        value: "astroneer"
                    },
                    {
                        name: "minecraft",
                        value: "minecraft"
                    }
                ]
            }
        ]
    },
    {
        name: "change_username",
        description: "Change your username",
        type: 1,
        options: [
            {
                name: "game",
                description: "What game to change the username on",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "astroneer",
                        value: "astroneer"
                    },
                    {
                        name: "minecraft",
                        value: "minecraft"
                    }
                ]
            }, {
                name: "username",
                description: "What to set your username as",
                type: 3,
                required: true,
            }
        ]
    },
    {
        name: "queue",
        description: "View the whitelisting queue (admins only)",
        type: 1,
        options: [
            {
                name: "game",
                description: "What game to view the queue of",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "astroneer",
                        value: "astroneer"
                    },
                    {
                        name: "minecraft",
                        value: "minecraft"
                    }
                ]
            }
        ]
    },
    {
        name: "notify",
        description: "Allows admin to notify user",
        type: 1,
        options: [
                 {
                     name: "game",
                     description: "The game you are whitelisting right now",
                     type: 3,
                     required: true,
                     choices: [
                         {
                             name: "astroneer",
                             value: "astroneer"
                         },
                         {
                             name: "minecraft",
                             value: "minecraft"
                         }
                     ]
                 }
                ,{
                    name: "user1",
                    description: "Multiple users to notify",
                    type: 6,
                    required: true
                },
                {
                    name: "user2",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user3",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user4",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user5",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user6",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user7",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user8",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user9",
                    description: "Multiple users to notify",
                    type: 6,
                },
                {
                    name: "user10",
                    description: "Multiple users to notify",
                    type: 6,
                },
        ]
    },
    {
        name: "add_users_to_db",
        description: "Adds users to database, temporary command",
        type: 1
    }
]