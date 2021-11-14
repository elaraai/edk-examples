// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
    Option, ProcessStructureSchema, ProcessMapping, Property, Add, Subtract, Divide, GetProperty, MLFunction, Not
} from '@elaraai/edk/lib';

import baseline_scenario from '../../gen/baseline.scenario';
import stuff from '../../gen/stuff.structure';
import flow_pipeline from '../../gen/flow.pipeline';

const flow = flow_pipeline.output_table

export default ProcessStructureSchema({
    concept: "flow",
    mapping: ProcessMapping({
        input_table: flow,
        date: flow.fields.date,
        properties: {
            current_stuff: GetProperty({
                property: stuff.properties.balance
            }),
            inflow: Option({
                default_value: flow.fields.flow,
                manual: [ { scenario: baseline_scenario, active: flow.fields.future, min: 0.0, max: 100.0, } ]
            }),
            outflow: MLFunction({
                features: {
                    balance: Property("current_stuff", "float"),
                },
                output: Divide(Property("current_stuff", "float"), 10.0),
                predict: flow.fields.future,
                train: Not(flow.fields.future),
            })
        },
        events: {
            flow: {
                property: stuff.properties.balance,
                value: Add(
                    Property("current_stuff", "float"), 
                    Subtract(
                        Property("inflow", "float"),
                        Property("outflow", "float")
                    )
                ),
            }
        }
    })
})