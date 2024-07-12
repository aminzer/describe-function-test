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
