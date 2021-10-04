// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { TimeCyclePlugin, TimeCycle, mergeSchemas} from  "@elaraai/edk/lib"
import covid from '../../gen/covid.source';
import purchases from '../../gen/purchases.source';
import sales from '../../gen/sales.source';

export default ELARA.Schema(
    mergeSchemas(
        TimeCyclePlugin({
            name: "Hourly",
            unit: 'hour',
            future_cycles: 168n,
            inputs: [
                TimeCycle({
                    table: sales.output,
                    value: sales.output.fields.Date
                }),
            ]
        }),
        TimeCyclePlugin({
            name: "Daily",
            unit: 'day',
            future_cycles: 7n,
            inputs: [
                TimeCycle({
                    table: sales.output,
                    value: sales.output.fields.Date
                }),
            ]
        }),
        TimeCyclePlugin({
            name: "Weekly",
            unit: 'week',
            future_cycles: 1n,
            inputs: [
                TimeCycle({
                    table: covid.output,
                    value: covid.output.fields.Date
                }),
                TimeCycle({
                    table: purchases.output,
                    value: purchases.output.fields.Date
                }),
                TimeCycle({
                    table: sales.output,
                    value: sales.output.fields.Date
                }),
            ]
        })
    )
)
