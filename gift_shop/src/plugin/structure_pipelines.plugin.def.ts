// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { AggregateOperation, DateKey, JoinOperation, PipelineSchema, mergeSchemas, Maximum } from "@elaraai/edk/lib"

import purchases_source from '../../gen/purchases.source';
import sales_source from '../../gen/sales.source';
import time_aggregate from '../../gen/time_aggregate.plugin';
import time_cycle from '../../gen/time_cycle.plugin';

const total_daily_covid = time_aggregate.pipeline.TotalDailyCovid.output_table
const total_hourly_sales = time_aggregate.pipeline.TotalHourlySales.output_table
const mean_daily_prices = time_aggregate.pipeline.MeanDailyPrices.output_table
const total_weekly_covid = time_aggregate.pipeline.TotalWeeklyCovid.output_table
const total_weekly_purchases = time_aggregate.pipeline.TotalWeeklyPurchases.output_table

const hourly_cycles = time_cycle.pipeline.Hourly.output_table
const daily_cycles = time_cycle.pipeline.Daily.output_table
const weekly_cycles = time_cycle.pipeline.Weekly.output_table
const sales = sales_source.output
const purchases = purchases_source.output

export default ELARA.Schema(
    mergeSchemas(
        PipelineSchema({
            name: 'Products',
            input_table: sales,
            operations: [
                AggregateOperation({
                    group_field: sales.fields.Product,
                    group_value: sales.fields.Product,
                    aggregations: {
                        Price: Maximum(sales.fields.Price),
                    }
                }),
            ]
        }),
        PipelineSchema({
            name: 'Supplies',
            input_table: purchases,
            operations: [
                AggregateOperation({
                    group_field: purchases.fields.Item,
                    group_value: purchases.fields.Item,
                    aggregations: {
                        Cost: Maximum(purchases.fields.Cost),
                        Terms: Maximum(purchases.fields.Cost)
                    }
                }),
            ]
        }),
        PipelineSchema({
            name: 'Promotions',
            input_table: mean_daily_prices,
            operations: [
                JoinOperation({
                    source_table: daily_cycles,
                    source_key: DateKey(daily_cycles.fields.Tick, 'day'),
                    source_selections: {
                        DailyCycle: daily_cycles.fields.Cycle
                    },
                    target_key: DateKey(mean_daily_prices.fields.Date, 'day'),
                    join_type: 'Left'
                }),
                JoinOperation({
                    source_table: weekly_cycles,
                    source_key: DateKey(weekly_cycles.fields.Tick, 'week'),
                    target_key: DateKey(mean_daily_prices.fields.Date, 'week'),
                    source_selections: {
                        WeeklyCycle: weekly_cycles.fields.Cycle
                    },
                    join_type: 'Left'
                })
            ]
        }),
        PipelineSchema({
            name: 'Sales',
            input_table: total_hourly_sales,
            operations: [
                JoinOperation({
                    source_table: total_daily_covid,
                    source_key: DateKey(total_daily_covid.fields.Date, 'day'),
                    source_selections: {
                        TotalCovidCases: total_daily_covid.fields.TotalCovidCases
                    },
                    target_key: DateKey(total_hourly_sales.fields.Date, 'day'),
                    join_type: 'Left'
                }),
                JoinOperation({
                    source_table: hourly_cycles,
                    source_key: DateKey(hourly_cycles.fields.Tick, 'hour'),
                    source_selections: {
                        HourlyCycle: hourly_cycles.fields.Cycle
                    },
                    target_key: DateKey(total_hourly_sales.fields.Date, 'hour'),
                    join_type: 'Left'
                }),
                JoinOperation({
                    source_table: weekly_cycles,
                    source_key: DateKey(weekly_cycles.fields.Tick, 'week'),
                    target_key: DateKey(total_hourly_sales.fields.Date, 'week'),
                    source_selections: {
                        WeeklyCycle: weekly_cycles.fields.Cycle
                    },
                    join_type: 'Left'
                })
            ]
        }),
        PipelineSchema({
            name: 'Purchases',
            input_table: total_weekly_purchases,
            operations: [
                JoinOperation({
                    source_table: total_weekly_covid,
                    source_key: DateKey(total_weekly_covid.fields.Date, 'week'),
                    source_selections: {
                        TotalCovidCases: total_weekly_covid.fields.TotalCovidCases
                    },
                    target_key: DateKey(total_weekly_purchases.fields.Date, 'week'),
                    join_type: 'Left'
                }),
                JoinOperation({
                    source_table: weekly_cycles,
                    source_key: DateKey(weekly_cycles.fields.Tick, 'week'),
                    target_key: DateKey(total_weekly_purchases.fields.Date, 'week'),
                    source_selections: {
                        WeeklyCycle: weekly_cycles.fields.Cycle
                    },
                    join_type: 'Left'
                })
            ]
        }),
    )
)
