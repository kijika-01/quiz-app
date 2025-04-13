// XSS対策のためのサニタイズ関数
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// 入力値のバリデーション
export const validateInput = (input: string): boolean => {
  // 空文字列チェック
  if (!input.trim()) return false;
  
  // 最大長チェック（100文字）
  if (input.length > 100) return false;
  
  // 特殊文字チェック
  const dangerousChars = /[<>{}[\]\\]/;
  if (dangerousChars.test(input)) return false;
  
  return true;
};

// タイマーの値の検証
export const validateTimerValue = (value: number): boolean => {
  // タイマーは0秒以上、300秒（5分）以下
  return value >= 0 && value <= 300;
}; 
// src/utils/security.ts に追加
export const logger = {
  info: (msg: string) => console.log(`[INFO]: ${msg}`),
  warn: (msg: string) => console.warn(`[WARN]: ${msg}`),
  error: (msg: string, err?: Error) => console.error(`[ERROR]: ${msg}`, err),
};

export const errorMessages = {
  answerError: '不正な選択肢です',
  timerError: 'タイマーの値が不正です',
};
