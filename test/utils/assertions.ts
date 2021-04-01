export function assertStatus(expectedStatus: number, actualStatus: number, errorMessage: string) {
    if (expectedStatus != actualStatus) {
      throw new Error(errorMessage + ` (${expectedStatus} != ${actualStatus})`)
    }
  }

export function assertStatus200(status: number, errorMessage?: string) {
    assertStatus(200, status, errorMessage)
  }