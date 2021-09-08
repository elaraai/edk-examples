// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {  ApplicationPlugin, Const, MLFunctionPlugin, Schema, SuperUser, mergeSchemas } from '@elaraai/edk/lib';

import dictionary from "../../gen/dictionary.structure"
import gp from "../../gen/gp.structure"
import rate from "../../gen/rate.structure"
import selector from "../../gen/selector.structure"
import dictionary_float from "../../gen/dictionary_float.structure"

export default Schema(
    ApplicationPlugin({
        name: "ML Example",
        schemas: {
            'Machine Learning':  mergeSchemas(
                MLFunctionPlugin({ func: gp.properties.items.function }),
                MLFunctionPlugin({ func: dictionary.properties.items.function }),
                MLFunctionPlugin({ func: rate.properties.items.function }),
                MLFunctionPlugin({ func: selector.properties.items.function }),
                MLFunctionPlugin({ func: dictionary_float.properties.items.function }),
            )
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
