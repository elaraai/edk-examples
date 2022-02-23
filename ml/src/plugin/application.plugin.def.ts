// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
  ApplicationPlugin,
  Const,
  mergeSchemas,
  MLFunctionPlugin,
  Schema,
  SimulationPlugin,
  StatusPlugin,
  SuperUser,
} from '@elaraai/edk/lib';

import dictionary from '../../gen/dictionary.structure';
import dictionary_float from '../../gen/dictionary_float.structure';
import gp from '../../gen/gp.structure';
import rate from '../../gen/rate.structure';
import selector from '../../gen/selector.structure';

export default Schema(
    ApplicationPlugin({
        name: "ML Example",
        schemas: {
            'Machine Learning':  mergeSchemas(
                MLFunctionPlugin({ func: gp.properties.items.function }),
                MLFunctionPlugin({ func: gp.properties.exponential.function }),
                MLFunctionPlugin({ func: gp.properties.items_max_likelihood.function }),
                MLFunctionPlugin({ func: gp.properties.items_probability.function }),
                MLFunctionPlugin({ func: dictionary.properties.items.function }),
                MLFunctionPlugin({ func: rate.properties.items.function }),
                MLFunctionPlugin({ func: selector.properties.items.function }),
                MLFunctionPlugin({ func: selector.properties.items_max_likelihood.function }),
                MLFunctionPlugin({ func: selector.properties.items_probability.function }),
                MLFunctionPlugin({ func: dictionary_float.properties.items.function }),
            ),
            'Simulation': mergeSchemas(
                SimulationPlugin({ name: "GP", entity: gp, properties: gp.properties }),
                SimulationPlugin({ name: "Rate", entity: rate, properties: rate.properties }),
                SimulationPlugin({ name: "Selector", entity: selector, properties: selector.properties }),
                SimulationPlugin({ name: "Dictionary", entity: dictionary, properties: dictionary.properties }),
                SimulationPlugin({ name: "Dictionary Float", entity: dictionary_float, properties: dictionary_float.properties }),
            ),
            'Status': StatusPlugin(),
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
