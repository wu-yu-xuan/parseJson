export interface ValidJsonString {
  type:
    | 'false'
    | 'true'
    | 'null'
    | 'number'
    | 'string'
    | 'object'
    | 'array'
    | 'error';
  value: string;
}

export type Json = boolean | null | number | string | JsonObject | JsonArray;
export interface JsonArray extends Array<Json> {}
export interface JsonObject {
  [key: string]: Json;
}
