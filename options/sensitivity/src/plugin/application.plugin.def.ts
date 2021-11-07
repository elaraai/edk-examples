// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import { 
    ApplicationPlugin, Const, OptionsPlugin, Schema,
    SimulationPlugin, SuperUser, mergeSchemas, MLFunctionPlugin, DataSourcePlugin, StatusPlugin
} from '@elaraai/edk/lib';

import baseline from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import sales from '../../gen/sales.structure';
import sales_data from '../../gen/sales.source';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Sensitivities: OptionsPlugin({
                name: "sales",
                entity: sales,
                scenario: baseline,
                options: {
                    price: sales.properties.price,
                },
                values: {
                    date: sales.date,
                    qty: sales.properties.qty,
                    cost: sales.properties.cost,
                    profit: sales.properties.profit,
                },
                output_entity: cash,
                output: cash.properties.balance,
            }),
            Predictions: mergeSchemas(
                SimulationPlugin({
                    name: "Sales Results",
                    entity: sales,
                    properties: sales.properties,
                    ml: false
                }),
                SimulationPlugin({
                    name: "Cash Results",
                    entity: cash,
                    marker: "account",
                    properties: cash.properties,
                })
            ),
            'Machine Learning': MLFunctionPlugin({
                func: sales.properties.qty.function
            }),
            Data: DataSourcePlugin({
                datasources: {
                    Sales: sales_data
                }
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
