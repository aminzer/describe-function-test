import { relative } from 'path';
import { toString as getAppRootPath } from 'app-root-path';
import { ignoredPathParts, testFileExtensions } from './config';

const formatTestName = (testFilePath: string): string => {
  const relativeTestFilePath = relative(getAppRootPath(), testFilePath);

  return relativeTestFilePath
    .split(/[/\\]/)
    .filter((token) => !!token && !ignoredPathParts.includes(token))
    .map((token) =>
      testFileExtensions.reduce(
        (formattedToken, fileExtension) => formattedToken.replace(fileExtension, ''),
        token,
      ),
    )
    .join(' > ');
};

export default formatTestName;
