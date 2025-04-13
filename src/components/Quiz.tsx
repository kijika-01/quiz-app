import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizState } from '../types/Quiz';
import { 
  sanitizeInput, 
  validateTimerValue, 
  errorMessages,
  logger 
} from '../utils/security';

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "バラ（赤）の花言葉は？",
    options: ["希望", "情熱", "秩序", "謙虚"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "ひまわりの花言葉は？",
    options: ["憧れ", "後悔", "偽りの愛", "尊敬"],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "カスミソウの花言葉は？",
    options: ["悲恋", "無邪気", "情熱", "復讐"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "チューリップ（赤）の花言葉は？",
    options: ["愛の告白", "友情", "別れ", "夢"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "コスモスの花言葉は？",
    options: ["希望", "別れ", "調和", "勇気"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "桜の花言葉は？",
    options: ["精神の美", "希望", "忍耐", "勝利"],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "アジサイの花言葉は？",
    options: ["理想", "成功", "栄光", "移り気"],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "ユリ（白）の花言葉は？",
    options: ["純粋", "嘘", "復讐", "元気"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "ラベンダーの花言葉は？",
    options: ["勇気", "誠実", "明るさ", "期待"],
    correctAnswer: 3
  },
  {
    id: 10,
    question: "スミレの花言葉は？",
    options: ["謙虚", "敬意", "嫉妬", "永遠"],
    correctAnswer: 0
  }
  // 今まで作った質問をすべてに対してsanitizeInputしていく
].map(question => ({
  ...question,
  question: sanitizeInput(question.question),
  options: question.options.map(option => sanitizeInput(option))
}));

// typescriptがちゃんと型をみてくれる
const Quiz: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false
  });
// 残り時間
  const [timeLeft, setTimeLeft] = useState<number>(60);
// タイマーがアクティブかどうか
  const [timerActive, setTimerActive] = useState<boolean>(false);
// エラーメッセージ
  const [error, setError] = useState<string | null>(null);
// 選択された回答
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
// 回答が表示されているかどうか
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  // クイズが開始されているかどうか
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // タイマーの処理をuseCallbackでメモ化
  const updateTimer = useCallback(() => {
    if (timerActive && timeLeft > 0) {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (!validateTimerValue(newTime)) {
          setError('タイマーの値が不正です');
          return prev;
        }
        return newTime;
      });
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setQuizState(prev => ({
        ...prev,
        isFinished: true
      }));
    }
    // タイマーがアクティブで残り時間が0より大きい場合、1秒ごとにupdateTimerを呼び出す
  }, [timeLeft, timerActive]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(updateTimer, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setQuizState(prev => ({
        // 前の状態をコピー
        ...prev,
        isFinished: true
      }));
    }
    return () => {
      // タイマーが存在するときだけ
      if (timer) {

        clearInterval(timer);
      }
    };
  }, [timerActive, timeLeft, updateTimer]);

  const startQuiz = useCallback(() => {
    setIsStarted(true);
    setTimerActive(true);
  }, []);

  const handleAnswer = useCallback((selectedOption: number) => {
    if (!timerActive) {
      logger.warn('タイマーが停止している状態での回答試行');
      return;
    }

    // 選択肢が0より小さいときか、選択肢の数より大きいときreturnする
    if (selectedOption < 0 || selectedOption >= quizState.questions[quizState.currentQuestionIndex].options.length) {
      logger.error('無効な選択肢が選択されました', new Error('Invalid option index'));
      setError(errorMessages.answerError);
      return;
    }

    setSelectedAnswer(selectedOption);
    setShowAnswer(true);
// 現在やっている問題をとりだす
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    // 選択された回答が正解かどうかを判断する
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
// 結果をログとして記録
    logger.info(`問題 ${quizState.currentQuestionIndex + 1} の回答: ${isCorrect ? '正解' : '不正解'}`);

    // 1秒後に次の問題に進む
    setTimeout(() => {
      if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
        setQuizState({
          // 今の状態をコピー
          ...quizState,
          // 次の問題に進む
          currentQuestionIndex: quizState.currentQuestionIndex + 1,
          // 答えが正解だったらスコアを1加算
          score: isCorrect ? quizState.score + 1 : quizState.score
        });
        // 選択された回答をnullにする
        setSelectedAnswer(null);
        // 回答が表示されているかどうかをfalseにする
        setShowAnswer(false);
      } else {
        // クイズが終了したら
        setQuizState({
          // 今の状態をコピー
          ...quizState,
          // スコアを加算
          score: isCorrect ? quizState.score + 1 : quizState.score,
          // クイズを終了
          isFinished: true
        });
        // タイマーを停止
        setTimerActive(false);
        logger.info(`クイズ終了。スコア: ${quizState.score + (isCorrect ? 1 : 0)}/${quizState.questions.length}`);
      }
    }, 1000);
    // 材料が変わったらレシピも変える
  }, [quizState, timerActive]);

  const resetQuiz = useCallback(() => {
    logger.info('クイズをリセット');
    setQuizState({
      questions: initialQuestions,
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false
    });
    setTimeLeft(60);
    setTimerActive(false);
    setError(null);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIsStarted(false);
  }, []);

  if (!isStarted) {
    return (
      <div className="quiz-container">
        <h2>花言葉クイズ</h2>
        <p>クイズを開始する準備はできましたか？</p>
        <button onClick={startQuiz} className="option-button">クイズを開始</button>
      </div>
    );
  }

  if (quizState.isFinished) {
    return (
      <div className="quiz-container">
        <h2>{timeLeft === 0 ? "時間切れ！" : "クイズ終了！"}</h2>
        <p>あなたのスコア: {quizState.score} / {quizState.questions.length}</p>
        <p>正答率: {Math.round((quizState.score / quizState.questions.length) * 100)}%</p>
        <button onClick={resetQuiz} className="option-button">もう一度挑戦</button>
      </div>
    );
  }
  // 現在やっている問題をとりだす
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="quiz-container">
      {error && <div className="error-message">{error}</div>}
      <div className="timer question-text">残り時間: {timeLeft}秒</div>
      <h2 className="question-text">問題 {quizState.currentQuestionIndex + 1}</h2>
      <p className="question-text">{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedAnswer === index ? 'selected' : ''
            } ${
              showAnswer && index === currentQuestion.correctAnswer ? 'correct' : ''
            }`}
            onClick={() => handleAnswer(index)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz; 