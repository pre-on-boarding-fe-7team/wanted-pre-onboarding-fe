const getMessage = (type, value = '') =>
  ({
    SIGNUP: '회원가입에 성공했습니다! 로그인 페이지로 이동합니다.',
    CREATE: `TodoList에 ${value}(이)가 추가되었습니다.`,
    UPDATE: `${value}(으)로 수정되었습니다.`,
    DELETE: `TodoList에서 ${value}(이)가 삭제되었습니다.`,
    COMPLETED: `${value}이(가) 완료 처리되었습니다.`,
    NOT_COMPLETE: `${value}이(가) 미완료 처리되었습니다.`,
    REQUEST_FAILED: '요청이 실패 했습니다!',
    ERROR: `${value} Error 인한 요청 실패!`,
  }[type]);

export default getMessage;
