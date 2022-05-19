// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { CollectDictSum, Maximum, Mean, Sum, TimeAggregatePlugin, TimeAggregation } from "@elaraai/edk/lib"

import covid from '../../gen/covid.source';
import purchases from '../../gen/purchases.source';
import sales from '../../gen/sales.source';

export default ELARA.Schema(
    TimeAggregatePlugin({
        inputs: {
            TotalHourlySales: TimeAggregation({
                table: sales.output,
                value: sales.output.fields.Date,
                unit: 'hour',
                mode: 'ceiling',
                aggregations: {
                    TotalSalesQty: CollectDictSum(sales.output.fields.Product, 1n),
                }
            }),
            MeanDailyPrices: TimeAggregation({
                table: sales.output,
                value: sales.output.fields.Date,
                unit: 'day',
                aggregations: {
                    MeanSalesPrice: Mean(sales.output.fields.Price),
                }
            }),
            TotalWeeklyPurchases: TimeAggregation({
                table: purchases.output,
                value: purchases.output.fields.Date,
                unit: 'week',
                mode: 'ceiling',
                aggregations: {
                    TotalPurchaseQty: CollectDictSum(
                        purchases.output.fields.Item,
                        purchases.output.fields.Qty
                    ),
                }
            }),
            TotalWeeklyCovid: TimeAggregation({
                table: covid.output,
                value: covid.output.fields.Date,
                unit: 'week',
                mode: 'ceiling',
                aggregations: {
                    TotalCovidCases: Sum(covid.output.fields.CovidCases),
                }
            }),
            TotalDailyCovid: TimeAggregation({
                table: covid.output,
                value: covid.output.fields.Date,
                unit: 'day',
                mode: 'ceiling',
                aggregations: {
                    TotalCovidCases: Maximum(covid.output.fields.CovidCases),
                }
            })
        }
    })
)
