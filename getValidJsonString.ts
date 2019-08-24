import { strict } from 'assert';
import findPair from './findPair';
import { ValidJsonString } from './interface';

/**
 * 尝试读取 input 中下一段合法 json
 * @param input
 */
export default function getValidJsonString(
  input: string,
  position = 0
): ValidJsonString {
  strict(input.length, 'input is empty string');
  switch (input[0]) {
    case 'f':
      assertStart(input, 'false', position);
      return {
        type: 'false',
        value: 'false'
      };
    case 't':
      assertStart(input, 'true', position);
      return {
        type: 'true',
        value: 'true'
      };
    case 'n':
      assertStart(input, 'null', position);
      return {
        type: 'null',
        value: 'null'
      };
    case '[':
      return {
        type: 'array',
        value: findPair({ input, endToken: ']' })
      };
    case '{':
      return {
        type: 'object',
        value: findPair({ input, endToken: '}' })
      };
    case '"':
      return {
        type: 'string',
        value: findPair({ input })
      };
    case '-':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      return {
        type: 'number',
        value: input.match(/^([\de\-\.+]+)/)![1]
      };
    default:
      strict(
        false,
        `unexpected start token in position ${position}: ${input[0]}`
      );
      return { type: 'error', value: '' };
  }
}

function assertStart(input: string, assert: string, position = 0) {
  strict(
    input.startsWith(assert),
    `unexpected token in position ${position}: ${input.slice(
      0,
      assert.length
    )}, expected '${assert}'`
  );
}
