export const commands = [
    {
        name: "apply",
        description: "Apply to the astroneer whitelist",
        type: 1,
        options: [
            {
                name: "username",
                description: "Put your astroneer username here",
                type: 3,
                required: true,
            }
        ]
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
    },
    {
        name: "add_users_to_db",
        description: "Adds users to database, temporary command",
        type: 1
    }
]