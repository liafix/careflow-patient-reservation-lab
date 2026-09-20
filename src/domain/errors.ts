export type CareFlowErrorCode =
  | "NETWORK_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SLOT_UNAVAILABLE"
  | "UNKNOWN_ERROR";

export class CareFlowApiError extends Error {
  readonly code: CareFlowErrorCode;
  readonly details?: Record<string, unknown>;

  constructor(code: CareFlowErrorCode, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "CareFlowApiError";
    this.code = code;
    this.details = details;

    // Restore prototype chain for ES5/ES6 inheritance correctness
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
