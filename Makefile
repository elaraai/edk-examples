help:
	@echo "Usage examples:"
	@echo ""
	@echo "    make build"
	@echo "    make help"

.PHONY: build
build: build-example-cli build-example-gift-shop build-example-datasources build-example-east build-example-ml build-example-options-automatic build-example-options-sensitivity build-example-pipelines build-example-visuals

.PHONY: build-example-datasources
build-example-datasources: build-example-datasource-files build-example-datasource-ftp build-example-datasource-plugins build-example-datasource-procedural build-example-datasource-rest build-example-datasource-sql

.PHONY: build-example-datasource-files
build-example-datasource-files:
	cd datasource/files && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-ftp
build-example-datasource-files:
	cd datasource/ftp && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugins
build-example-datasource-plugins: build-example-datasource-plugin-aroflo build-example-datasource-plugin-deputy build-example-datasource-plugin-holidays build-example-datasource-plugin-kounta build-example-datasource-plugin-mailchimp build-example-datasource-plugin-profitwell build-example-datasource-plugin-shopify build-example-datasource-plugin-myob build-example-datasource-plugin-weather build-example-datasource-plugin-xero

.PHONY: build-example-datasource-plugin-aroflo
build-example-datasource-plugin-aroflo:
	cd datasource/plugin/aroflo && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-deputy
build-example-datasource-plugin-deputy:
	cd datasource/plugin/deputy && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-holidays
build-example-datasource-plugin-holidays:
	cd datasource/plugin/holidays && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-kounta
build-example-datasource-plugin-kounta:
	cd datasource/plugin/kounta && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-mailchimp
build-example-datasource-plugin-mailchimp:
	cd datasource/plugin/mailchimp && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-myob
build-example-datasource-plugin-myob:
	cd datasource/plugin/myob && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-profitwell
build-example-datasource-plugin-profitwell:
	cd datasource/plugin/profitwell && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-shopify
build-example-datasource-plugin-shopify:
	cd datasource/plugin/shopify && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-weather
build-example-datasource-plugin-weather:
	cd datasource/plugin/weather && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-plugin-xero
build-example-datasource-plugin-xero:
	cd datasource/plugin/xero && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-procedural
build-example-datasource-procedural:
	cd datasource/procedural && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-rest
build-example-datasource-rest:
	cd datasource/rest && npm install && rm -rf gen && edk build

.PHONY: build-example-datasource-sql
build-example-datasource-sql:
	cd datasource/sql && npm install && rm -rf gen && edk build

.PHONY: build-example-cli
build-example-cli:
	cd cli && npm install && rm -rf gen && edk build

.PHONY: build-example-gift-shop
build-example-gift-shop:
	cd gift_shop && npm install && rm -rf gen && edk build

.PHONY: build-example-east
build-example-east:
	cd east && npm install && rm -rf gen && edk build

.PHONY: build-example-ml
build-example-ml:
	cd ml && npm install && rm -rf gen && edk build

.PHONY: build-example-options-automatic
build-example-options-automatic:
	cd options/automatic && npm install && rm -rf gen && edk build

.PHONY: build-example-options-sensitivity
build-example-options-sensitivity:
	cd options/sensitivity && npm install && rm -rf gen && edk build

.PHONY: build-example-pipelines
build-example-pipelines:
	cd pipelines && npm install && rm -rf gen && edk build

.PHONY: build-example-visuals
build-example-visuals:
	cd visuals && npm install && rm -rf gen && edk build
