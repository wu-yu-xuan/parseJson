import parseObject from './parseObject';

describe('parseObject function works well', () => {
  it('parses object right', () => {
    function testObject(obj: Object) {
      expect(parseObject(JSON.stringify(obj))).toStrictEqual(obj);
    }
    testObject({});
    testObject({ a: 1 });
    testObject({ a: null });
    testObject({ a: false });
    testObject({ a: true });
    testObject({
      a: true,
      b: false,
      c: null,
      d: 1
    });
    testObject({
      a: {
        b: {
          c: 1
        },
        d: [{ e: 2 }, null, false]
      }
    });
  });
});
