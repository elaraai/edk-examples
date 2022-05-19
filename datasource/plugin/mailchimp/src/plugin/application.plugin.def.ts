// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, MailchimpPlugin, Const, EnvironmentVariable, Poll, SuperUser } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Mailchimp Plugin",
        schemas: {
            "Mailchimp" : MailchimpPlugin({
                poll: Poll({ value: 1, unit: 'day' }),
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'MAILCHIMP_KEY' }),
        ]
    })
)
