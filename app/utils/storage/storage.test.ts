import AsyncStorage from "@react-native-async-storage/async-storage"
import { beforeEach, afterEach, expect, test, vi } from "vitest"
import { load, loadString, save, saveString, clear, remove } from "./storage"

// fixtures
const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

// Set up the mocks for AsyncStorage methods
beforeEach(() => {
  vi.spyOn(AsyncStorage, "getItem").mockResolvedValue(VALUE_STRING)
  vi.spyOn(AsyncStorage, "setItem").mockResolvedValue(undefined)
  vi.spyOn(AsyncStorage, "removeItem").mockResolvedValue(undefined)
  vi.spyOn(AsyncStorage, "clear").mockResolvedValue(undefined)
})

// Clear all mocks after each test
afterEach(() => {
  vi.restoreAllMocks()
})

test("load", async () => {
  const value = await load("something")
  expect(value).toEqual(JSON.parse(VALUE_STRING))
})

test("loadString", async () => {
  const value = await loadString("something")
  expect(value).toEqual(VALUE_STRING)
})

test("save", async () => {
  await save("something", VALUE_OBJECT)
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("saveString", async () => {
  await saveString("something", VALUE_STRING)
  expect(AsyncStorage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("remove", async () => {
  await remove("something")
  expect(AsyncStorage.removeItem).toHaveBeenCalledWith("something")
})

test("clear", async () => {
  await clear()
  expect(AsyncStorage.clear).toHaveBeenCalled()
})
