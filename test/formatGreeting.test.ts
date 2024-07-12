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
