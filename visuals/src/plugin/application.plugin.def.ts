// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {  ApplicationPlugin, Const, Schema, SuperUser, StatusPlugin, PagePlugin, ApplicationStyle, ApplicationColors, colors } from '@elaraai/edk/lib';

import page_plugin from "../../gen/page.plugin"

export default Schema(
    ApplicationPlugin({
        name: "Visual Example",
        inject_schemas: false,
        schemas: {
            Pages: PagePlugin({ pages: page_plugin.page }),
            Status: StatusPlugin(),
        },
        style: ApplicationStyle({
            colors: ApplicationColors({
                primary: colors.LightGray,
                accent: colors.Green,
            }),
        }),
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin')
            })
        ],
    })
)
