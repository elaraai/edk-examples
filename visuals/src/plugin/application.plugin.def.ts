// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {  ApplicationPlugin, Const, Schema, SuperUser, PagePlugin, StatusPlugin } from '@elaraai/edk/lib';

import group_one from "../../gen/group_one.page"
import group_two from "../../gen/group_two.page"
import group_three from "../../gen/group_three.page"
import group_four from "../../gen/group_four.page"
import row_one from "../../gen/row_one.page"
import row_two from "../../gen/row_two.page"
import row_three from "../../gen/row_three.page"


export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        inject_schemas: false,
        schemas: {
            Pages: PagePlugin({
                pages: [
                    group_one,
                    group_two,
                    group_three,
                    group_four,
                    row_one,
                    row_two,
                    row_three
                ]
            }),
            Status: StatusPlugin(),
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin')
            })
        ],
    })
)
