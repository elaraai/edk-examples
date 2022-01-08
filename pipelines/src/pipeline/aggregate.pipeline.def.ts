// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import test_one from '../../gen/test_one.source';

export default ELARA.PipelineSchema({
    name: 'Aggregate',
    input_table: test_one.output,
    operations: [
        ELARA.AggregateOperation({
            group_field: ELARA.Variable("Aggregate.Group", 'string'),
            group_value: ELARA.StringJoin`${test_one.output.fields.integer}.${test_one.output.fields.string}`,
            aggregations: {
                count: ELARA.Count(test_one.output.fields.number),
                distinctcount: ELARA.DistinctCount(test_one.output.fields.string),
                unique: ELARA.Unique(ELARA.StringJoin`${test_one.output.fields.integer}.${test_one.output.fields.string}`),
                sum: ELARA.Sum(test_one.output.fields.number),
                mean: ELARA.Mean(test_one.output.fields.number),
                stddev: ELARA.StdDev(test_one.output.fields.number),
                collectset: ELARA.CollectSet(test_one.output.fields.string),
                collectdict: ELARA.CollectDict(test_one.output.fields.string, test_one.output.fields.number),
                collectdictcount: ELARA.CollectDictCount(test_one.output.fields.string),
                collectdictsum: ELARA.CollectDictSum(test_one.output.fields.string, test_one.output.fields.number),
                some: ELARA.Some(test_one.output.fields.boolean),
                every: ELARA.Every(test_one.output.fields.boolean),
                mode: ELARA.Mode(test_one.output.fields.number),
                minimum: ELARA.Minimum(test_one.output.fields.number),
                maximum: ELARA.Maximum(test_one.output.fields.number),
                span: ELARA.Span(test_one.output.fields.number),
                findminimum: ELARA.FindMinimum(test_one.output.fields.string, test_one.output.fields.number),
                findmaximum: ELARA.FindMaximum(test_one.output.fields.string, test_one.output.fields.number),
                median: ELARA.Median(test_one.output.fields.number),
                sparsedictsum: ELARA.SparseDictSum(test_one.output.fields.Dict),
                sparsedictmean: ELARA.SparseDictMean(test_one.output.fields.Dict),
                sparsedictvariance: ELARA.SparseDictMean(test_one.output.fields.Dict),
                sparsedictcovariance: ELARA.SparseDictCovariance(test_one.output.fields.Dict),
            }
        })
    ],
})
