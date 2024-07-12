import formatTestName from '../formatTestName';
import describeTestCases from './describeTestCases';
import identity from './identity';
import { TestCase } from './types';

const describeFunctionTest = <Args extends unknown[], Result>(
  functionToTest: (...args: Args) => Result,
  testFilePath: string,
  {
    testCases,
    testCaseGroups,
    prepareResult = identity,
    beforeAll: beforeAllCallback,
    afterAll: afterAllCallback,
  }: {
    testCases?: TestCase<Args, Result>[];
    testCaseGroups?: {
      description: string;
      testCases: TestCase<Args, Result>[];
      only?: boolean;
    }[];
    prepareResult?: (result: Result) => unknown;
    beforeAll?: () => void;
    afterAll?: () => void;
  },
): void => {
  describe(formatTestName(testFilePath), () => {
    if (beforeAllCallback) {
      beforeAll(beforeAllCallback);
    }

    if (afterAllCallback) {
      afterAll(afterAllCallback);
    }

    if (testCases) {
      describeTestCases({
        testCases,
        functionToTest,
        prepareResult,
      });
    }

    if (testCaseGroups) {
      testCaseGroups.forEach(({ description, testCases: groupTestCases, only }) => {
        const describeTestCaseGroup = only ? describe.only : describe;

        describeTestCaseGroup(description, () => {
          describeTestCases({
            testCases: groupTestCases,
            functionToTest,
            prepareResult,
          });
        });
      });
    }
  });
};

export default describeFunctionTest;
