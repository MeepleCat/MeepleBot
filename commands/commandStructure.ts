export const commands = [
    {
        name: "add_users_to_db",
        description: "Adds users of the discord server to the database. Temporary command",
        type: 1
    },
    {
        name: "balance",
        description: "Check your balance",
        type: 1
    },
    {
        name: "send-money",
        description: "Send money to someone",
        type: 1,
        options: [
            {
                name: "username",
                description: "Who to send the money to",
                type: 6,
                required: true
            },
            {
                name: "money",
                description: "How much money to give",
                type: 4,
                required: true,
            }
        ]
    },
    {
        name: "transaction-history",
        description: "View your transaction history",
        type: 1,
    },
    {
        name: "work",
        description: "Gain money by working",
        type: 1,
    },
    {
        name: "apply",
        description: "Apply to the astroneer whitelist",
        type: 1,
    },
    {
        name: "queue",
        description: "View the whitelisting queue (admins only)",
        type: 1
    },
    {
        name: "notify",
        description: "Allows admin to notify user",
        type: 1,
        options: [
                {
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
        ]
    }
]