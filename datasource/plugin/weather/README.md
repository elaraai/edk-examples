# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to integrate with [BOM API](https://api.weather.bom.gov.au/v1) and [historic data sets](ftp://ftp.bom.gov.au/anon/gen/clim_data/IDCKWCDEA0).

# Usage

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating an application containing an Weather plugin. Use of this plugin requires manually defining the following `Environment` values with respect to each other:
- WEATHER_NAME: the name of a station as found in ftp://ftp.bom.gov.au/anon/gen/clim_data/IDCKWCDEA0/tables/stations_db.txt
- WEATHER_GEOHASH, WEATHER_STATE: the geohash and state of the station, as by searching by postcode https://api.weather.bom.gov.au/v1/locations?search=3130

## Adding application
The whole application can be added with the following command ```edk add plugin --name "Application" --def_dir src/plugin```. The plugin, a ```SuperUser``` and related environment variables are added as:

```typescript
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, WeatherPlugin, Const, EnvironmentVariable, Poll, SuperUser } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Weather Plugin",
        schemas: {
            "Weather" : WeatherPlugin({
                poll: Poll({ value: 1, unit: 'day' }),
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'WEATHER_GEOHASH' }),
            EnvironmentVariable({ name: 'WEATHER_NAME' }),
            EnvironmentVariable({ name: 'WEATHER_STATE' }),
        ]
    })
)
```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API](https://elaraai.github.io/docs/edk): programmatic api for the cli functionality