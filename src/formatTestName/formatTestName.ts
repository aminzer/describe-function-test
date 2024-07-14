import { relative, sep } from 'path';
import { toString as getAppRootPath } from 'app-root-path';
import { ignoredPathParts, pathSeparatorRegex, testFileExtensions } from './config';

const formatTestName = (testFilePath: string): string => {
  const relativeTestFilePath = relative(
    getAppRootPath().replace(pathSeparatorRegex, sep),
    testFilePath.replace(pathSeparatorRegex, sep),
  );

  return relativeTestFilePath
    .split(pathSeparatorRegex)
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
