# Overview

Example solution that demonstrates the use of the [EDK API](https://elaraai.github.io/docs/api) available in the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk).

# Usage
The project contains a valid ELARA project that simply creates a single `Scenario` called "Test", the use of the API will remove and create said `Scenario`, then build the schema:
- Build the program: ```npm run build``` which will build the program define in ```src/index.ts```.
    - Note that this is not an ELARA asset.
- Run the program: ```npm run execute```
- Inspect the ```schema.json```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI reference](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API reference](https://elaraai.github.io/docs/api): programmatic api for the cli functionality