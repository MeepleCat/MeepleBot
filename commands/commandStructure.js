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
    }
]