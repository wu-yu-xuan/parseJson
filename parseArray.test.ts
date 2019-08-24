import { JsonArray } from './interface';
import parseArray from './parseArray';

describe('parseArray function works well', () => {
  it('parses array right', () => {
    function testArray(arr: JsonArray) {
      expect(parseArray(JSON.stringify(arr))).toStrictEqual(arr);
    }
    testArray([]);
    testArray([null, false, true, 1, '233', {}, []]);
    testArray([[null], [false], [true, 1], ['233', {}, []]]);
  });
});
