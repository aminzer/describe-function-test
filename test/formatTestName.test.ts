import { setPath } from 'app-root-path';
import formatTestName from '../src/formatTestName';

describe('formatTestName', () => {
  beforeEach(() => {
    setPath('/path/to/project');
  });

  describe('when there are no ignored path parts', () => {
    it('returns correct test name', () => {
      expect(formatTestName('/path/to/project/module/admin/login.test.ts')).toBe(
        'module > admin > login',
      );
    });
  });

  describe('when there are ignored path parts', () => {
    it('returns correct test name', () => {
      expect(formatTestName('/path/to/project/src/module/admin/__tests__/login.test.ts')).toBe(
        'module > admin > login',
      );
    });
  });

  describe('when test file has .js extension', () => {
    it('returns correct test name', () => {
      expect(formatTestName('/path/to/project/module/admin/login.test.js')).toBe(
        'module > admin > login',
      );
    });
  });

  describe('when Windows file path is used', () => {
    beforeEach(() => {
      setPath('D:\\path\\to\\project');
    });

    it('returns correct test name', () => {
      expect(formatTestName('D:\\path\\to\\project\\module\\admin\\login.test.ts')).toBe(
        'module > admin > login',
      );
    });
  });
});
