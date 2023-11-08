// vitest.setup.ts
import { vi } from 'vitest';
import mockFile from "./mockFile"
import AsyncStorageMock from './vitest-async-storage-mock';

// Mocks
vi.mock('react-native', async () => {
  const actual = await vi.importActual('react-native'); // Import the actual module

  // Create a custom mock for Image if needed
  const mockImage = {
    ...actual.Image,
    resolveAssetSource: vi.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
    getSize: vi.fn((uri, success) => success(100, 100)),
  };

  return {
    ...actual, // Spread all actual exports
    Image: mockImage, // Override the Image export with your mock
    // Add other specific mocks or overrides here
    // e.g., Platform: { ...actual.Platform, OS: 'test', Version: 'test' },
  };
});


vi.mock('@react-native-async-storage/async-storage', async () => {
  return {
    ...AsyncStorageMock,
    default: AsyncStorageMock,
  };
});




vi.mock('i18n-js', () => {
  // Define the mock functions
  const t = (key: string, params: Record<string, any>) => `${key} ${JSON.stringify(params)}`;
  const currentLocale = () => "en";

  // Create the mock module object
  const mockModule = {
    t,
    currentLocale,
  };

  return {
    ...mockModule,
    default: mockModule, // Include the module object as the default export
  };
});

// Use fake timers
vi.useFakeTimers();

// Set up any globals
global.__TEST__ = true;