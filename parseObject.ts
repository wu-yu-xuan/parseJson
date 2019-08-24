import { strictEqual, strict } from 'assert';
import findPair from './findPair';
import getValidJsonString from './getValidJsonString';
import parseValidJsonString from './parseValidJsonString';
import { JsonObject } from './interface';

export default function parseObject(input: string, position = 0): JsonObject {
  strictEqual(
    input[0],
    '{',
    `unexpected object start token in position ${position}: ${
      input[0]
    }, expected '{'`
  );
  strictEqual(
    input[input.length - 1],
    '}',
    `unexpected object start token in position ${position +
      input.length -
      1}: ${input[input.length - 1]}, expected '}'`
  );

  /**
   * 去掉 "{"
   */
  let left = input.slice(1);

  function parseKey() {
    left = left.trimLeft();
    const key = findPair({ input: left, startToken: '"', endToken: '"' });
    /**
     * 去头去尾两个引号
     */
    left = left.slice(key.length);
    return key.slice(1, key.length - 1);
  }

  function parseColon() {
    left = left.trimLeft();
    strictEqual(
      left[0],
      ':',
      `unexpected colon token in position ${position +
        input.length -
        left.length}: ${left[0]}, expected ":"`
    );
    /**
     * 去掉冒号
     */
    left = left.slice(1);
  }

  function parseValue() {
    left = left.trimLeft();
    const validJsonString = getValidJsonString(
      left,
      position + input.length - left.length
    );
    left = left.slice(validJsonString.value.length);
    return parseValidJsonString(validJsonString);
  }

  const result: JsonObject = {};

  function parseLeft() {
    left = left.trimLeft();
    if (left === '}') {
      return;
    }
    const key = parseKey();
    parseColon();
    const value = parseValue();
    result[key] = value;
    left = left.trimLeft();
    if (left[0] === ',') {
      /**
       * 去掉 ","
       */
      left = left.slice(1);
      parseLeft();
      return;
    } else if (left === '}') {
      return;
    }
    strict(
      false,
      `unexpected colon or end token in position ${position +
        input.length -
        left.length}: ${left[0]}, expected "," or "}"`
    );
  }

  parseLeft();
  return result;
}
