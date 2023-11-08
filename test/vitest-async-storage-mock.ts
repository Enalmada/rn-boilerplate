/* eslint-disable no-undef */

import { vi } from 'vitest';

const merge = require('merge-options').bind({
  concatArrays: true,
  ignoreUndefined: true,
});

const asMock = {
  __INTERNAL_MOCK_STORAGE__: {},

  setItem: vi.fn(async (key, value, callback) => {
    const setResult = await asMock.multiSet([[key, value]], undefined);
    callback && callback(setResult);
    return setResult;
  }),

  getItem: vi.fn(async (key, callback) => {
    const getResult = await asMock.multiGet([key], undefined);
    const result = getResult[0] ? getResult[0][1] : null;
    callback && callback(null, result);
    return result;
  }),

  removeItem: vi.fn((key, callback) => asMock.multiRemove([key], callback)),
  mergeItem: vi.fn((key, value, callback) => asMock.multiMerge([[key, value]], callback)),

  clear: vi.fn(_clear),
  getAllKeys: vi.fn(_getAllKeys),
  flushGetRequests: vi.fn(),

  multiGet: vi.fn(_multiGet),
  multiSet: vi.fn(_multiSet),
  multiRemove: vi.fn(_multiRemove),
  multiMerge: vi.fn(_multiMerge),
  useAsyncStorage: vi.fn((key) => {
    return {
      getItem: (...args) => asMock.getItem(key, ...args),
      setItem: (...args) => asMock.setItem(key, ...args),
      mergeItem: (...args) => asMock.mergeItem(key, ...args),
      removeItem: (...args) => asMock.removeItem(key, ...args),
    };
  }),
};

async function _multiSet(keyValuePairs, callback) {
  keyValuePairs.forEach((keyValue) => {
    const key = keyValue[0];

    asMock.__INTERNAL_MOCK_STORAGE__[key] = keyValue[1];
  });
  callback && callback(null);
  return null;
}

async function _multiGet(keys, callback) {
  const values = keys.map((key) => [
    key,
    asMock.__INTERNAL_MOCK_STORAGE__[key] || null,
  ]);
  callback && callback(null, values);

  return values;
}

async function _multiRemove(keys, callback) {
  keys.forEach((key) => {
    if (asMock.__INTERNAL_MOCK_STORAGE__[key]) {
      delete asMock.__INTERNAL_MOCK_STORAGE__[key];
    }
  });

  callback && callback(null);
  return null;
}

async function _clear(callback) {
  asMock.__INTERNAL_MOCK_STORAGE__ = {};

  callback && callback(null);

  return null;
}

async function _getAllKeys() {
  return Object.keys(asMock.__INTERNAL_MOCK_STORAGE__);
}

async function _multiMerge(keyValuePairs, callback) {
  keyValuePairs.forEach((keyValue) => {
    const [key, value] = keyValue;
    const oldValue = asMock.__INTERNAL_MOCK_STORAGE__[key];
    asMock.__INTERNAL_MOCK_STORAGE__[key] =
      oldValue != null
        ? JSON.stringify(merge(JSON.parse(oldValue), JSON.parse(value)))
        : value;
  });

  callback && callback(null);
  return null;
}

export default asMock;
