declare global {
  interface Console {
    tron: {
      log: (...args: any[]) => void
      warn: (...args: any[]) => void
      error: (...args: any[]) => void
      display: (object: any) => void
      trackMstNode: (node: any) => void
    }
  }
}

export {}
