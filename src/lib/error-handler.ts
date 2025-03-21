import { AppError, ErrorCodes, ErrorStatusCodes } from "@/types/error";

// API 에러를 처리하고 AppError 인스턴스로 변환하는 유틸리티 함수
export const handleApiError = (error: unknown): AppError => {
  // 이미 AppError 인스턴스인 경우 그대로 반환
  if (error instanceof AppError) {
    return error;
  }

  // 일반 Error 인스턴스인 경우 AppError로 변환
  if (error instanceof Error) {
    return new AppError(
      ErrorCodes.SERVER_ERROR,
      error.message,
      undefined,
      ErrorStatusCodes[ErrorCodes.SERVER_ERROR]
    );
  }

  // 알 수 없는 에러 타입인 경우 기본 에러 반환
  return new AppError(
    ErrorCodes.SERVER_ERROR,
    "알 수 없는 오류가 발생했습니다.",
    undefined,
    ErrorStatusCodes[ErrorCodes.SERVER_ERROR]
  );
};

// 포스트 관련 파라미터 유효성 검사 함수
export const validatePostParams = (params: { slug: string }) => {
  if (!params?.slug) {
    throw new AppError(
      ErrorCodes.INVALID_PARAMS,
      "포스트 슬러그가 필요합니다.",
      undefined,
      ErrorStatusCodes[ErrorCodes.INVALID_PARAMS]
    );
  }
};

// 카테고리 관련 파라미터 유효성 검사 함수
export const validateCategoryParams = (params: { category: string }) => {
  if (!params?.category) {
    throw new AppError(
      ErrorCodes.INVALID_PARAMS,
      "카테고리가 필요합니다.",
      undefined,
      ErrorStatusCodes[ErrorCodes.INVALID_PARAMS]
    );
  }
};
