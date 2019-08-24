import { strictEqual } from 'assert';
import { JsonArray } from './interface';
import getValidJsonString from './getValidJsonString';
import parseValidJsonString from './parseValidJsonString';

export default function parseArray(input: string, position = 0): JsonArray {
  strictEqual(
    input[0],
    '[',
    `unexpected array start token in position ${position}: ${
      input[0]
    }, expected '['`
  );
  strictEqual(
    input[input.length - 1],
    ']',
    `unexpected array start token in position ${position + input.length - 1}: ${
      input[input.length - 1]
    }, expected ']'`
  );

  let left = input.slice(1);
  const result: JsonArray = [];

  function parseEnd() {
    left = left.trimLeft();
    return left.length === 1 && left[0] === ']';
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

  function parseComma() {
    left = left.trimLeft();
    strictEqual(
      left[0],
      ',',
      `unexpected colon token in position ${position +
        input.length -
        left.length}: ${left[0]}, expected ","`
    );
    left = left.slice(1);
  }

  function parseLeft(): JsonArray {
    left = left.trimLeft();
    const isEnd = parseEnd();
    if (isEnd) {
      return result;
    } else {
      parseComma();
      result.push(parseValue());
      return parseLeft();
    }
  }

  const isEnd = parseEnd();
  if (isEnd) {
    return result;
  } else {
    result.push(parseValue());
    return parseLeft();
  }
}
