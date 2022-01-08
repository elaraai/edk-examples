# EDK Examples

The purpose of the EDK examples is to provide worked usage of all aspects of ELARA using the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk). The source code for all examples can be found in the [edk-examples repository](https://github.com/elaraai/edk-examples).

## Projects
See below for the various project categories and corresponding links.

- [Gift Shop](./east/README.md): the example as documented in the [getting started documentation](../start/start.development), demonstrating end-to-end usage to solve complex business problems.

### General projects
- [Expression](./east/README.md): usage of `Expression`s to manipulate streaming data values.
- [Events](./events/README.md): usage of `Event`s and explicit `date` properties to simulate common business processes.

### Datasource projects
- [File](./datasource/files/README.md): usage of `FileUri` to create `CsvDataSource`, `XlsxDataSource`, `JsonDataSource` to create streaming `Expression` values from local files.
- [FTP](./datasource/ftp/README.md): usage of `FtpUri` to create `CsvDataSource`, `XlsxDataSource`, `JsonDataSource` to create streaming `Expression` values from remote files.
- [Procedural](./datasource/procedural/README.md): usage of the `RangeDataSource`, `ClockDataSource` and `ArrayDataSource` to create procedural streaming `Expression` values .
- [RESTFul API](./datasource/rest/README.md): usage of a `RestAPIDataSource` to create streaming `Expression` values from the [Github API](https://docs.github.com/en/rest)
- [SQL](./datasource/sql/README.md): usage of a `SQLDataSource` to create streaming `Expression` values from an example SQL database.

### Pipeline projects
- [Pipelines](./pipelines/README.md): usage of `Pipeline`s to apply operations such as `FilterOperation`, `AggregateOperation`, `JoinOperation`, `SelectOperation` to transform data.

### Plugin projects
- [AroFlo](./datasource/plugin/aroflo/README.md): usage of the `AroFloPlugin` to create streaming `Expression` values from the [AroFlo API](https://apidocs.aroflo.com/).
- [Deputy](./datasource/plugin/deputy/README.md): an example documenting usage of the `DeputyPlugin` to create streaming `Expression` values from the [Deputy API](https://www.deputy.com/api-doc/API/Getting_Started).
- [Holidays](./datasource/plugin/holidays/README.md): usage of the `HolidaysPlugin`  to create streaming `Expression` values of public holiday data.
- [Kounta](./datasource/plugin/kounta/README.md): usage of the `KountaPlugin` to create streaming `Expression` values from the [Kounta API](https://apidoc.kounta.com/).
- [Mailchimp](./datasource/plugin/mailchimp/README.md): usage of the `MailchimpPlugin` to create streaming `Expression` values from the [Mailchimp marketing api](https://mailchimp.com/developer/marketing/api/).
- [Myob](./datasource/plugin/myob/README.md): usage of the `MyobPlugin` to create streaming `Expression` values from the [MYOB Essentials API](https://developer.myob.com/api/accountright/api-overview/getting-started/).
- [Profitwell](./datasource/plugin/profitwell/README.md): usage of the `ProfitwellPlugin` to create streaming `Expression` values from the [Profitwell API](https://profitwellapiv2.docs.apiary.io/).
- [Shopify](./datasource/plugin/shopify/README.md): usage of the `ShopifyPlugin` to create streaming `Expression` values from the [Shopify Admin API](https://shopify.dev/api/admin/rest/reference) for a private app.
- [Weather](./datasource/plugin/weather/README.md): usage of `WeatherPlugin` to create streaming `Expression` values from the [BOM API](https://api.weather.bom.gov.au/v1) and [BOM historic data sets](ftp://ftp.bom.gov.au/anon/gen/clim_data/IDCKWCDEA0).
- [Xero](./datasource/plugin/xero/README.md): usage of the `XeroPlugin` to create streaming `Expression` values from the [Xero API](https://developer.xero.com/).

### Machine learning projects
- [Machine Learning](./ml/README.md): usage of `MLFunction` to predict unknown functions from data records.

### Option projects
- [Sensitivity](./options/sensitivity/README.md): usage sensitivity `Option`s to understand how much impact pricing decisions have on maximising profit.
- [Automatic](./options/automatic/README.md): usage of automatic `Option`s to find the optimal pricing choice to maximise profit.
- [Manual](./options/manual/README.md): usage of manual `Option`s to explore the impact of manually adjustying different properties of a sales process.
- [Queues](./options/queues/README.md): usage of automatic `Option`s to optimise a complex queueing process.

### Application projects
- [Visuals](./visuals/README.md) : an example documenting usage of `Page`s, `Visual`s and `Series`s to visualise data in a secure web application.

## Reference
For general usage and code examples we provide the following detailed documentation:
- [EDK CLI](../cli/cli.md): detailed CLI usage reference and examples
- [EDK API](../api/index.md): programmatic api for the cli functionality

## Release Notes
The following release notes summarise changes accross [edk](https://www.npmjs.com/package/@elaraai/edk), [edk-io package](https://www.npmjs.com/package/@elaraai/edk-io), [edk-examples](https://github.com/elaraai/edk-examples).

- **Version 3.1**
    - edk/lib:
        - Application:
            - Added `GroupCombinedVisual` to visualise a combination column and line chart on a shared numeric y axes.
            - Added `VisualList` to allow secondary charts to be shown on a page using drag and drop into existing `PanelVisual` objects
            - Added `powered`, `ApplicationIcon` and updates to `ApplicationColors` for customised styling of UI.
            - Improve UI and visual loading
    -edk/io:
        - Store:
            - Added list, size and top commands to enable interaction with the file store.
    - edk-examples:
        - Added customisation of `Application` and `VisualList` to `Visual Example` in [edk-examples](https://github.com/elaraai/edk-examples).

- **Version 3.0**
    - edk/lib:
        - Structure:
            - Remove `predict` predicate in `Process`, `Resource` and `Agent` entities, to automate seperation of deterministic trajectories from probabilistic trajectories in simulation.
    - edk-examples:
        - Update all examples with removal of `predict` predicate in `Process`, `Resource` and `Agent` entities.

- **Version 2.3**
    - edk:
        - Added `edk add visual` command to manage visual assets.
    - edk/lib:
        - Schema:
            - Seperate `Visual` into root of schema object.
        - Application:
            - Added `RowPivotVisual` to visualise ordered structs in a dense pivot grid.
            - Improve UI and visual styling
            - Improved `Layout` and `Axis` definition and helper functions.
    - edk-examples:
        - Update `Visual Example` in [edk-examples](https://github.com/elaraai/edk-examples) to demonstrate `RowPivotVisual`.
        - Added `Large Example` in [edk-examples](https://github.com/elaraai/edk-examples) to demonstrate simulation for large problems.

- **Version 2.2**
    - edk:
        - Added `edk build` speed improvements.
        - Added `edk links` command to view the relationships to a specificed project asset.
    - edk/lib:
        - Plugin:
            - Added `ScenarioFlattenPlugin` to transpose multiple `Scenario` rows into value `Expression`s per `Scenario`.
            - Added `TimeBoundsPlugin` to calculate the temporal range accross multiple `Table`s.
        - Pipeline:
            - Added `DistributionOperation` to generate grouped distributions in a `Pipeline`.
            - Added `OffsetOperation` to select expressions from sorted offset rows in a `Pipeline`.
        - Structure:
            - Add explicit `date` configuration for `SingleEvent` and `MultipleEvent`.
        - Application:
            - Added `RowRidgelineVisual` to visualise high resolution stacked [ridgeline charts](https://observablehq.com/@d3/ridgeline-plot).
            - Added `z_overlap` to `RowRidgelineVisual` and `GroupRidgelineVisual` to control of `z` vertical cutoff.
            - Added `key` to `GroupLineVisual` to generate nested lines.
            - Improved `Layout` and `Axis` definition and helper functions.
    - edk-examples:
        - Added `Queue Example` in [edk-examples](https://github.com/elaraai/edk-examples) to demonstrate optimisation of service orientated work.
        - Added `Event Example` in [edk-examples](https://github.com/elaraai/edk-examples) to demonstrate explicit event dates in simulation.
        - Added `Manual Example` in [edk-examples](https://github.com/elaraai/edk-examples) to demonstrate practical use of manual options.
        - Update `Pipeline Example` in [edk-examples](https://github.com/elaraai/edk-examples) to demonstrate `OffsetOperation ` and `DistributionOperation`.

- **Version 2.1**
    - edk
        - Seperated input/ouput (including detection) related edk functionality into [edk-io package](https://www.npmjs.com/package/@elaraai/edk-io).
        - Added handling of `uri` schema to `edk add datasource` and `edk-io detect`.
        - Added `version` command to view currently installed version of `edk-io` and `edk`.
    - edk/lib:
        - Datasource:
            - Added `uri` schema to `DataSource` for generalised specification of the following protocols: `ftp://`, `sftp://`, `http://`, `https://`, `mssql://`, `file://`.
    - edk-examples:
        - Initial publish of [edk-examples](https://github.com/elaraai/edk-examples).

- **Version 2.0**
    - Initial public release