import { useState, useEffect } from 'react';
import style from "./Timer.module.css";
import { formatTime, calculateTime } from '../utils/auxiliaryFunctions';

const Timer = () => {
  // States
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState({ field: null, value: '' });

  // 🟦 Update progress bar
  useEffect(() => {
    const progress = initialTime > 0 ? (time / initialTime) * 100 : 0;
    document.documentElement.style.setProperty('--progress', `${Math.max(0, progress)}%`);
  }, [time, initialTime]);

  // 🟦 Stable countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // 🟦 Handle editing
  const handleEditField = (field) => {
    if (editState.field === field) {
      const newTime = {
        ...formatTime(time),
        [field]: editState.value.padStart(2, '0')
      };

      const calculated = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);
      setTime(calculated);
      setInitialTime(calculated);
      setEditState({ field: null, value: '' });
    } else {
      setIsRunning(false);
      setEditState({ field, value: formatTime(time)[field].replace(/^0+/, '') });
    }
  };

  // 🟦 Input handling
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditState((prev) => ({ ...prev, value }));
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') handleEditField(field);
  };

  const { hours, minutes, seconds } = formatTime(time);

  // 🟦 Reset
  const handleReset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return (
    <div className={style.timerApp}>
      <div className={style.timerDisplay}>
        <div className={style.timerCircle}>
          <div className={style.timerTime}>
            {/* Hours */}
            {editState.field === 'hours' ? (
              <input
                className={style.timeInput}
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField('hours')}
                onKeyDown={(e) => handleKeyDown(e, 'hours')}
                autoFocus
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField('hours')}
              >
                {hours}
              </span>
            )}
            :
            {/* Minutes */}
            {editState.field === 'minutes' ? (
              <input
                className={style.timeInput}
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField('minutes')}
                onKeyDown={(e) => handleKeyDown(e, 'minutes')}
                autoFocus
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField('minutes')}
              >
                {minutes}
              </span>
            )}
            :
            {/* Seconds */}
            {editState.field === 'seconds' ? (
              <input
                className={style.timeInput}
                type="text"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField('seconds')}
                onKeyDown={(e) => handleKeyDown(e, 'seconds')}
                autoFocus
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField('seconds')}
              >
                {seconds}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 🟦 Buttons */}
      <div className={style.actionButtons}>
        <button
          className={style.actionButton}
          onClick={() => {
            if (initialTime > 0) setIsRunning(!isRunning);
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button className={style.actionButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
