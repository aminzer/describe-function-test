export interface TestCase<Args extends unknown[], Result> {
  args: Args;
  expectedResult: Result;
  additionalAssertion?: (params: { args: Args; result: Result }) => void;
  description?: string;
  only?: boolean;
}
