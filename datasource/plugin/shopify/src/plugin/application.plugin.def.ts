// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, ShopifyPlugin, Const, EnvironmentVariable, Poll, SuperUser } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Shopify Plugin",
        schemas: {
            "Shopify" : ShopifyPlugin({
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
            EnvironmentVariable({ name: 'SHOPIFY_API_KEY' }),
            EnvironmentVariable({ name: 'SHOPIFY_PASSWORD' }),
            EnvironmentVariable({ name: 'SHOPIFY_URL' }),
        ]
    })
)