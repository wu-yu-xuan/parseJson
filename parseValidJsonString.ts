import { ValidJsonString, Json } from './interface';
import parseNum from './parseNum';
import { strict } from 'assert';
import parseObject from './parseObject';
import parseArray from './parseArray';

export default function parseValidJsonString(
  { type, value }: ValidJsonString,
  position = 0
): Json {
  switch (type) {
    case 'null':
      return null;
    case 'false':
      return false;
    case 'true':
      return true;
    case 'number':
      return parseNum(value, position);
    case 'string':
      /**
       * 去头去尾两个引号
       */
      return value.slice(1, value.length - 1);
    case 'object':
      return parseObject(value, position);
    case 'array':
      return parseArray(value, position);
    default:
      strict(false, `unexpected type: ${type}`);
      return null;
  }
}
