import { TestCase } from './types';

const describeTestCases = <Args extends unknown[], Result>({
  testCases,
  functionToTest,
  prepareResult,
}: {
  testCases: TestCase<Args, Result>[];
  functionToTest: (...args: Args) => Result;
  prepareResult: (result: Result) => unknown;
}): void => {
  testCases.forEach(({ args, expectedResult, additionalAssertion, description, only }) => {
    const describeTestCase = only ? describe.only : describe;

    describeTestCase(description ?? `when arguments are ${JSON.stringify(args)}`, () => {
      it(`returns ${JSON.stringify(expectedResult)}`, () => {
        const result = functionToTest(...args);

        expect(prepareResult(result)).toEqual(prepareResult(expectedResult));

        if (additionalAssertion) {
          additionalAssertion({ args, result });
        }
      });
    });
  });
};

export default describeTestCases;
