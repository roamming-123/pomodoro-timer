import { useEffect, useState } from "react";
import "./App.css";

type Mode = "work" | "break";

export default function PomodoroTimer() {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState<Mode>("work");
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);

          const nextMode: Mode = mode === "work" ? "break" : "work";
          setMode(nextMode);

          return nextMode === "work" ? WORK_TIME : BREAK_TIME;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
  };

  const changeMode = (nextMode: Mode) => {
    setIsRunning(false);
    setMode(nextMode);
    setTimeLeft(nextMode === "work" ? WORK_TIME : BREAK_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <main className="pomodoro">
      <div className="timer-box">
        <h1>🍅 공부시간 타이머</h1>

        <div className="tabs">
          <button
            className={mode === "work" ? "tab active" : "tab"}
            onClick={() => changeMode("work")}
          >
            집중
          </button>

          <button
            className={mode === "break" ? "tab active" : "tab"}
            onClick={() => changeMode("break")}
          >
            휴식
          </button>
        </div>

        <div className="time">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>

        <div className="buttons">
          <button
            className="main-button"
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "일시정지" : "시작"}
          </button>

          <button className="reset-button" onClick={reset}>
            리셋
          </button>
        </div>

        <p className="status">
          {mode === "work"
            ? "🔥 집중할 시간입니다!"
            : "☕ 잠시 쉬어가세요!"}
        </p>
      </div>
    </main>
  );
}
