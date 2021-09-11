// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import faker from 'faker';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as fs from 'fs';
dayjs.extend(utc)

const N_CATEGORIES = 10;
const N_ROWS = 500;

const dict_rand: { [key: string]: number; } = {}

// generate some random suburbs
const category_1: string[] = []
const category_2: string[] = []
const category_3: string[] = []
for (let i = 0; i < N_CATEGORIES; i++) {
    category_1.push(faker.random.word())
    dict_rand[category_1[i]] = faker.datatype.number({ min: 5, max: 10, precision: 0.5 })
    category_2.push(faker.random.word())
    category_3.push(faker.random.word())
}

export const rows: {
    "Identifier": string,
    "Prev Identifier": string | null,
    "Group": string,
    "String 1": string,
    "String 2": string,
    "Prev String 1": string | null,
    "Prev String 2": string | null,
    "String 3": string,
    "Date 1": Date,
    "Date 1 Alt": Date,
    "Date 2": Date,
    "Date 2 Alt": Date,
    "Date 3": Date,
    "Number 1": number,
    "Number 2": number,
    "Number 3": number,
    "Integer 1": number,
    "Integer 2": number,
    "Integer 3": number,
    "Boolean 1": boolean,
    "Boolean 2": boolean,
    "Latitude": number,
    "Longitude": number,
    "Struct": {
        "Date": Date,
        "Number": number,
        "Integer": number,
        "String": string,
        "Boolean": boolean,
        "Struct": {
            "Date": Date,
            "Number": number,
            "Integer": number,
            "String": string,
            "Boolean": boolean,
            "Array": {
                "Date": Date,
                "Number": number,
                "Integer": number,
                "String": string,
                "Boolean": boolean,
                "Set": string[]
            }[]
        },
        "Array": number[]
    },
    "Array": {
        "Date": Date,
        "Number": number,
        "Integer": number,
        "String": string,
        "Boolean": boolean,
        "Array": Date[]
    }[],
    "Dict": {
        [key: string]: number
    }
}[] = []

for(let g = 0; g < 5; g++) {
    let date = new Date();
    let date_3 = new Date();
    category_1.forEach((cat, offset) => {
        const N = Math.ceil(N_ROWS / category_1.length)
        for (let i = 0; i < N; i++) {
            let date_1 = i === 0 ?
                dayjs.utc(date).add(faker.datatype.number({ min: 0, max: 10, precision: 0.5 }), 'hour').toDate() :
                dayjs.utc(rows[i + offset * N - 1]["Date 2"]).add(faker.datatype.number({ min: 0, max: 10, precision: 0.5 }), 'hour').toDate()
            let date_1_alt = dayjs.utc(date_1).add(faker.datatype.number({ min: -1, max: 1, precision: 0.5 }), 'hour').toDate()
            let date_2 = dayjs.utc(date_1).add(faker.datatype.number({ min: 4, max: 10, precision: 0.5 }), 'hour').toDate()
            let date_2_alt = dayjs.utc(date_2).add(faker.datatype.number({ min: -1, max: 1, precision: 0.5 }), 'hour').toDate()
            date_3 = dayjs.utc(date_3).add(faker.datatype.number({ min: 0, max: 10, precision: 0.5 }), 'hour').toDate()
            const dict: { [key: string]: number; } = {}
            category_1.forEach((category, index) => {
                let value = 0;
                let rand = 0;
                if (i === 0) {
                    if (index === 0) {
                        rand = faker.datatype.number({ min: 5, max: 10, precision: 0.1 });
                        value = rand;
                        dict[category] = value
                    }
                     else {
                        value = dict[category_1[0]] + dict_rand[category_1[index]]
                        dict[category] = value
                    }
                } else {
                    if (index === 0) {
                        rand = faker.datatype.number({ min: -0.1, max: 0.1, precision: 0.01 })
                        value = rows[i - 1]["Dict"][category] + rand
                        dict[category] = value
                    } else  {
                        value = dict[category_1[0]] + dict_rand[category_1[index]]
                        dict[category] = value
                    }
                }
            })
            // dict_rand_array.push(dict_rand)
            rows.push({
                "Identifier": `ROW-${g}-${i + offset * N}`,
                "Prev Identifier": i > 0 ? `ROW-${g}-${i + offset * N - 1}` : null,
                "Group": `GROUP-${g}`,
                "String 1": cat,
                "String 2": faker.random.arrayElement(category_2),
                "Prev String 1": i === 0 ? null : rows[i - 1]['String 1'],
                "Prev String 2": i === 0 ? null : rows[i - 1]['String 2'],
                "String 3": faker.random.arrayElement(category_3),
                "Date 1": date_1,
                "Date 1 Alt": date_1_alt,
                "Date 2": date_2,
                "Date 2 Alt": date_2_alt,
                "Date 3": date_3,
                "Number 1": i > 0 ? rows[i + offset * N - 1]["Number 1"] + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                "Number 2": (i + offset * N - 1) > 0 ? rows[i + offset * N - 1]["Number 2"] + faker.datatype.number({ min: -0.5, max: 0.5, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                "Number 3": i > 0 ? rows[i + offset * N - 1]["Number 3"] + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                "Integer 1": i > 0 ? rows[i + offset * N - 1]["Integer 1"] + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                "Integer 2": (i + offset * N - 1) > 0 ? rows[i + offset * N - 1]["Integer 2"] + faker.datatype.number({ min: -1, max: 1, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                "Integer 3": i > 0 ? rows[i + offset * N - 1]["Integer 3"] + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                "Boolean 1": faker.datatype.boolean(),
                "Boolean 2": faker.datatype.boolean(),
                "Latitude": -27.4900 + faker.datatype.number({ min: -2.0, max: 2.0, precision: 0.001 }),
                "Longitude": 153.0351 + faker.datatype.number({ min: -2.0, max: 2.0, precision: 0.001 }),
                "Struct": {
                    "Date": date_1,
                    "Number": i > 0 ? rows[i + offset * N - 1]["Struct"].Number + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                    "Integer": i > 0 ? rows[i + offset * N - 1]["Struct"].Integer + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                    "String": cat,
                    "Boolean": faker.datatype.boolean(),
                    "Struct": {
                        "Date": date_1,
                        "Number": i > 0 ? rows[i + offset * N - 1]["Struct"].Number + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                        "Integer": i > 0 ? rows[i + offset * N - 1]["Struct"].Integer + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                        "String": cat,
                        "Boolean": faker.datatype.boolean(),
                        "Array": [
                            {
                                "Date": date_1,
                                "Number": i > 0 ? rows[i + offset * N - 1]["Struct"].Number + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                                "Integer": i > 0 ? rows[i + offset * N - 1]["Struct"].Integer + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                                "String": cat,
                                "Boolean": faker.datatype.boolean(),
                                "Set": [
                                    faker.random.word(),
                                    faker.random.word(),
                                    faker.random.word(),
                                    faker.random.word()
                                ]
                            },
                            {
                                "Date": date_1,
                                "Number": i > 0 ? rows[i + offset * N - 1]["Struct"].Number + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                                "Integer": i > 0 ? rows[i + offset * N - 1]["Struct"].Integer + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                                "String": cat,
                                "Boolean": faker.datatype.boolean(),
                                "Set": [
                                    faker.random.word(),
                                    faker.random.word(),
                                    faker.random.word(),
                                    faker.random.word()
                                ]
                            },
                            {
                                "Date": date_1,
                                "Number": i > 0 ? rows[i + offset * N - 1]["Struct"].Number + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                                "Integer": i > 0 ? rows[i + offset * N - 1]["Struct"].Integer + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                                "String": cat,
                                "Boolean": faker.datatype.boolean(),
                                "Set": [
                                    faker.random.word(),
                                    faker.random.word(),
                                    faker.random.word(),
                                    faker.random.word()
                                ]
                            }
                        ]
                    },
                    "Array": [
                        faker.datatype.number({ min: -1, max: 1, precision: 0.1 }),
                        faker.datatype.number({ min: -1, max: 1, precision: 0.1 }),
                        faker.datatype.number({ min: -1, max: 1, precision: 0.1 }),
                        faker.datatype.number({ min: -1, max: 1, precision: 0.1 })
                    ]
                },
                "Array": [{
                    "Date": date_1,
                    "Number": i > 0 ? rows[i + offset * N - 1]["Array"][0].Number + faker.datatype.number({ min: -1, max: 1, precision: 0.1 }) : faker.datatype.number({ min: -10, max: 10, precision: 0.1 }),
                    "Integer": i > 0 ? rows[i + offset * N - 1]["Array"][0].Integer + faker.datatype.number({ min: -5, max: 5, precision: 1 }) : faker.datatype.number({ min: -15, max: 15, precision: 1 }),
                    "String": cat,
                    "Boolean": faker.datatype.boolean(),
                    "Array": [date_1, date_2]
                }],
                "Dict": dict
            })
        
        }
    })
}

fs.writeFileSync("data/rows.jsonl", rows.map(row => JSON.stringify(row)).join('\r\n'))
