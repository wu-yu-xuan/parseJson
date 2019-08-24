export interface ValidJsonString {
  type: 'false' | 'true' | 'null' | 'number' | 'string' | 'object' | 'array';
  value: string;
}

export type Json = boolean | null | number | string | Object | JsonArray;
export interface JsonArray extends Array<Json> {}
