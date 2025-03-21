// API 에러 응답의 기본 구조를 정의하는 인터페이스
export interface ApiError {
  code: string; // 에러 코드
  message: string; // 에러 메시지
  details?: unknown; // 추가 에러 상세 정보 (선택적)
}

// 애플리케이션 전체에서 사용할 커스텀 에러 클래스
export class AppError extends Error {
  constructor(
    public code: string, // 에러 코드
    message: string, // 에러 메시지
    public details?: unknown, // 추가 에러 상세 정보 (선택적)
    public statusCode: number = 500 // HTTP 상태 코드 (기본값: 500)
  ) {
    super(message);
    this.name = "AppError";
    // Error.prototype.chain을 복사하여 instanceof 체크가 정상 작동하도록 함
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// 애플리케이션에서 사용할 에러 코드 상수 정의
export const ErrorCodes = {
  NOT_FOUND: "NOT_FOUND", // 리소스를 찾을 수 없음
  INVALID_PARAMS: "INVALID_PARAMS", // 잘못된 파라미터
  SERVER_ERROR: "SERVER_ERROR", // 서버 에러
  NETWORK_ERROR: "NETWORK_ERROR", // 네트워크 에러
  VALIDATION_ERROR: "VALIDATION_ERROR", // 유효성 검사 에러
} as const;

// 에러 코드에 해당하는 HTTP 상태 코드 매핑
export const ErrorStatusCodes = {
  [ErrorCodes.NOT_FOUND]: 404, // Not Found
  [ErrorCodes.INVALID_PARAMS]: 400, // Bad Request
  [ErrorCodes.SERVER_ERROR]: 500, // Internal Server Error
  [ErrorCodes.NETWORK_ERROR]: 503, // Service Unavailable
  [ErrorCodes.VALIDATION_ERROR]: 422, // Unprocessable Entity
} as const;
