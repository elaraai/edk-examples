// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import {
  ApplicationPlugin,
  Const,
  DataSourcePlugin,
  mergeSchemas,
  OptionsPlugin,
  Partition,
  PredictionPlugin,
  Print,
  Schema,
  SimulationPlugin,
  StatusPlugin,
  SuperUser,
  Variable,
} from '@elaraai/edk/lib';

import baseline from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import sales_source from '../../gen/sales.source';
import sales from '../../gen/sales.structure';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Options: OptionsPlugin({
                name: "sales",
                entity: sales,
                scenario: baseline,
                options: {
                    datetime: sales.properties.datetime,
                    qty: sales.properties.qty,
                    supplier: sales.properties.supplier,
                    refund: sales.properties.refund,
                    price: sales.properties.price,
                    tags: sales.properties.tags,
                },
                values: {
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
                    ml: false,
                    partitions: {
                        refund: Partition({
                            partition_key: Print(Variable('refund', 'boolean'))
                        })
                    }
                }),
                SimulationPlugin({
                    name: "Cash Results",
                    entity: cash,
                    marker: "account",
                    properties: cash.properties,
                })
            ),
            Datasource: DataSourcePlugin({
                datasources: [sales_source]
            }),
            "Prediction Performance": PredictionPlugin(),
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