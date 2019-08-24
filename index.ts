import findPair from './findPair';
import { strict, strictEqual } from 'assert';
import parseNum from './parseNum';
import getValidJsonString from './getValidJsonString';
import { Json } from './interface';
import parseValidJsonString from './parseValidJsonString';

/**
 * @see https://www.json.org/json-zh.html
 */
export default function parseJson(input: string): Json {
  const trim = input.trim();
  strict(trim.length, 'input is empty string');
  const position = input.indexOf(trim);
  const { value, type } = getValidJsonString(trim, position);
  strictEqual(
    value,
    trim,
    `unexpected end token in position ${position + value.length}: ${
      trim[position + value.length]
    }`
  );
  return parseValidJsonString({ type, value }, position);
}
