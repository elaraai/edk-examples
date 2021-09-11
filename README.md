# EDK Examples

The purpose of the EDK examples is to provide worked usage of all aspects of ELARA using the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk). The source code for all examples can be found in the [edk-examples repository](https://github.com/elaraai/edk-examples).

## Projects
See below for the various project categories and corresponding links.

- [Gift Shop](./east/README.md): the example as documented in the [getting started documentation](../start/start.development), demonstrating end-to-end usage to solve complex business problems.

### General projects
- [Expression](./east/README.md): usage of `Expression`s to manipulate streaming data values.

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
- [Sensitivity](./options/sensitivity/README.md): usage sensitivity `Option`s to understand how much impact decision have on outcomes outcomes.
- [Automatic](./options/automatic/README.md): usage of automatic `Option`s to find the choice for a decision that leads to optimum outcomes.

### Application projects
- [Visuals](./visuals/README.md) : an example documenting usage of `Page`s, `Visual`s and `Series`s to visualise data in a secure web application.

## Reference
For general usage and code examples we provide the following detailed documentation:
- [EDK CLI](../cli/cli.md): detailed CLI usage reference and examples
- [EDK API](../api/index.md): programmatic api for the cli functionality