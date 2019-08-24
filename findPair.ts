import { strictEqual, strict } from 'assert';

export interface FindPair {
  input: string;
  startToken?: string;
  endToken?: string;
}

/**
 * @todo `"\""`
 * @todo `{"}"}`
 * @param param0
 */
export default function findPair({
  input,
  startToken = input[0],
  endToken = startToken
}: FindPair): string {
  strict(input.length >= 2, 'input.length must >= 2');
  strictEqual(input[0], startToken, 'input must start with startToken');
  /**
   * because input[0] must be startToken
   */
  let current = 1;
  const { length } = input;
  while (current < length) {
    if (input[current] === endToken) {
      return input.slice(0, current + 1);
    }
    if (input[current] === startToken) {
      current += findPair({ input: input.slice(current), startToken, endToken })
        .length;
    } else {
      current++;
    }
  }
  strict(false, 'could not find the right endToken');
}
