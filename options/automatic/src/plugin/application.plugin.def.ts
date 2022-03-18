// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
  ApplicationPlugin,
  Const,
  mergeSchemas,
  MLFunctionPlugin,
  OptimizationPlugin,
  PredictionPlugin,
  ScenarioComparePlugin,
  Schema,
  SimulationPlugin,
  StatusPlugin,
  SuperUser,
  TablesPlugin,
} from '@elaraai/edk/lib';

import baseline from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import optimized from '../../gen/optimized.scenario';
import sales_data from '../../gen/sales.source';
import sales from '../../gen/sales.structure';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Optimization: OptimizationPlugin(),
            Comparison: ScenarioComparePlugin({
                name: "sales",
                entity: sales,
                baseline_scenario: baseline,
                comparison_scenario: optimized,
                output_entity: cash,
                output: cash.properties.balance,
                values: {
                    date: sales.date,
                    qty: sales.properties.qty,
                    cost: sales.properties.cost,
                    profit: sales.properties.profit,
                },
                options: {
                    price: sales.properties.price,
                }
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
            Mappings: TablesPlugin({
                tables: {
                    "Sales Instances": sales.instance_table,
                    "Cash Instances": cash.instance_table,
                }
            }),
            Data: TablesPlugin({
                tables: {
                    "Sales Data": sales_data.output
                }
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
