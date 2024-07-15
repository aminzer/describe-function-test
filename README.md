## @aminzer/describe-function-test

Simple helper for defining Jest tests for functions.

### Usage example

Example function:
```typescript
const formatGreeting = ({ personName }: { personName?: string } = {}): string => {
  if (personName) {
    return `Welcome, ${personName}!`;
  }

  return `Welcome!`;
};

export default formatGreeting;
```

Example test:
```typescript
import { describeFunctionTest } from '../src';
import formatGreeting from './formatGreeting';

describeFunctionTest(formatGreeting, __filename, {
  testCases: [
    {
      description: 'when no arguments are passed',
      args: [],
      expectedResult: 'Welcome!',
    },
    {
      description: 'when person name is passed',
      args: [{ personName: 'Mike' }],
      expectedResult: 'Welcome, Mike!',
    },
  ],
});

```

### API

**describeFunctionTest**

##### Overview

`describeFunctionTest` is used for defining a test for the provided function with predefined test cases.
It's using native Jest `describe` function under the hood.

##### Import
```typescript
import { describeFunctionTest } from '@aminzer/describe-function-test';
```

##### Parameters

* `functionToTest` (`function`, required) - function to be tested.
* `testFilePath` (`string`, required) - Path to the test file. `__filename` can be used here.
* `options` (`object`, required) - test settings.

`options` object accepts the following arguments:
* `testCases` (`TestCase[]`, optional) - non-grouped test cases to be verified.
* `testCaseGroups` (`{ description: string, testCases: TestCase[], only?: boolean }[]`, optional) - grouped test cases to be verified.
* `prepareResult` (`function`, optional) - function to format actual and expected test results before comparison. If not provided - the results are compared as is.
* `beforeAll` (`function`, optional) - function that's passed as an argument to Jest `beforeAll` call for all tests.
* `afterAll` (`function`, optional) - function that's passed as an argument to Jest `afterAll` call for all tests.

`TestCase<Args extends unknown[], Result>` type contains:
* `description` (`string`, optional) - test case description.
* `args` (`Args`, required) - array of arguments that are passed to the tested function in this test case.
* `expectedResult` (`Result`, required) - expected function call return value for the passed args.
* `additionalAssertion` (`function`, optional) - additional checks that need to be verified in this test case.
* `only` (`boolean`, optional) - if `true` - this test case is defined with Jest `describe.only` call.

##### Return value

`void`, nothing is returned.

**formatTestName**

##### Overview

`formatTestName` is used for generation of test name in format `path > to > tested > file`.

##### Import
```typescript
import { formatTestName } from '@aminzer/describe-function-test';
```

##### Parameters

* `testFilePath` (`string`, required) - Path to the test file. `__filename` can be used here.

##### Return value

`string` - formatted test name.
