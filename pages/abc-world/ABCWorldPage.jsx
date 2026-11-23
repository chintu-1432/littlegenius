
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMascot } from '../../components/mascot/useMascot';
import { FunkyButton } from '../../components/buttons/FunkyButton';
import { alphabetData } from '../../modules/abc-data';
import { awardRewards, getRewards } from '../../utils/rewards';

const ABCWorldPage = () => {
  const { celebrate } = useMascot();

  const [currentLetter, setCurrentLetter] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [tracePoints, setTracePoints] = useState([]);
  const [isTracing, setIsTracing] = useState(false);
  const [traceComplete, setTraceComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rewardData, setRewardData] = useState(() => getRewards());
  const [sessionStars, setSessionStars] = useState(0);
  const [completedLetters, setCompletedLetters] = useState([]);
  const [quizAwarded, setQuizAwarded] = useState([]);
  const [traceAwarded, setTraceAwarded] = useState([]);

  const letter = alphabetData[currentLetter];

  useEffect(() => {
    const refreshRewards = () => setRewardData(getRewards());

    window.addEventListener('rewardsUpdated', refreshRewards);
    window.addEventListener('focus', refreshRewards);

    return () => {
      window.removeEventListener('rewardsUpdated', refreshRewards);
      window.removeEventListener('focus', refreshRewards);
    };
  }, []);

  const quizOptions = useMemo(() => {
    if (!letter?.word) return [];

    const otherWords = alphabetData
      .map(item => item.word)
      .filter(word => word && word.toLowerCase() !== letter.word.toLowerCase());

    const shuffled = [...otherWords].sort(() => Math.random() - 0.5);

    return [letter.word, ...shuffled.slice(0, 3)]
      .sort(() => Math.random() - 0.5);
  }, [letter]);

  if (!letter) {
    return <div className="abc-error">No alphabet data available.</div>;
  }

  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      setFeedback('Your browser does not support voice learning.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.15;

    window.speechSynthesis.speak(utterance);
  };

  const pronounceLetter = () => {
    speak(`Letter ${letter.letter}. ${letter.sound}. ${letter.word || ''}`);
  };

  const addReward = (stars) => {
    awardRewards({ stars });
    setSessionStars(previous => previous + stars);
    setRewardData(getRewards());
  };

  const nextLetter = () => {
    setCurrentLetter(previous =>
      previous < alphabetData.length - 1 ? previous + 1 : 0
    );

    setShowQuiz(false);
    setTracePoints([]);
    setTraceComplete(false);
    setFeedback('');
    setIsTracing(false);
  };

  const previousLetter = () => {
    if (currentLetter === 0) return;

    setCurrentLetter(previous => previous - 1);
    setShowQuiz(false);
    setTracePoints([]);
    setTraceComplete(false);
    setFeedback('');
    setIsTracing(false);
  };

  const handleAnswer = (word) => {
    if (quizAwarded.includes(currentLetter)) {
      setFeedback('You have already earned the reward for this letter!');
      return;
    }

    if (word.toLowerCase() === letter.word?.toLowerCase()) {
      setCorrectAnswers(previous => previous + 1);
      setScore(previous => previous + 5);
      setQuizAwarded(previous => [...previous, currentLetter]);
      setCompletedLetters(previous =>
        previous.includes(currentLetter) ? previous : [...previous, currentLetter]
      );

      addReward(5);
      setFeedback('🎉 Amazing! Correct answer! You earned 5 stars!');
      celebrate?.();
    } else {
      setFeedback('💛 Good try! Listen and try again.');
    }

    setShowQuiz(false);
  };

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsTracing(true);
    setTraceComplete(false);
    setFeedback('');

    const rect = event.currentTarget.getBoundingClientRect();

    setTracePoints([{
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }]);
  };

  const handlePointerMove = (event) => {
    if (!isTracing) return;

    const rect = event.currentTarget.getBoundingClientRect();

    setTracePoints(previous => [
      ...previous,
      {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    ]);
  };

  const handlePointerUp = () => {
    if (!isTracing) return;

    setIsTracing(false);

    if (tracePoints.length > 5) {
      setTraceComplete(true);

      if (!traceAwarded.includes(currentLetter)) {
        setTraceAwarded(previous => [...previous, currentLetter]);
        setCompletedLetters(previous =>
          previous.includes(currentLetter) ? previous : [...previous, currentLetter]
        );

        setScore(previous => previous + 2);
        addReward(2);
        setFeedback('🌟 Beautiful tracing! You earned 2 stars!');
        celebrate?.();
      } else {
        setFeedback('Great tracing! You already collected this letter’s tracing reward.');
      }
    } else {
      setFeedback('Try drawing a little more to complete the letter.');
    }
  };

  const clearTrace = () => {
    setTracePoints([]);
    setTraceComplete(false);
    setIsTracing(false);
    setFeedback('');
  };

  const progress = ((currentLetter + 1) / alphabetData.length) * 100;
  const totalStars = rewardData.stars || 0;
  const totalCoins = rewardData.coins || 0;

  return (
    <div className="abc-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap');

        .abc-page {
          min-height: 100vh;
          padding: 24px;
          overflow: hidden;
          color: #30304d;
          font-family: 'Nunito', sans-serif;
          background:
            radial-gradient(circle at 5% 10%, #ffe5f0 0, transparent 25%),
            radial-gradient(circle at 95% 15%, #dff8ff 0, transparent 25%),
            linear-gradient(135deg, #fff9ed, #f1edff 55%, #e9faff);
        }

        .abc-page * { box-sizing: border-box; }

        .abc-topbar {
          max-width: 1180px;
          margin: 0 auto 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .abc-back {
          text-decoration: none;
          color: #6252bd;
          background: white;
          padding: 12px 20px;
          border-radius: 18px;
          font-weight: 900;
          box-shadow: 0 5px 18px #6551a51a;
          transition: .25s;
        }

        .abc-back:hover { transform: translateY(-3px); color: #4935a6; }

        .abc-brand {
          font-family: 'Baloo 2', cursive;
          font-size: 27px;
          font-weight: 800;
          color: #6650c9;
        }

        .abc-star-pill {
          background: white;
          padding: 11px 18px;
          border-radius: 20px;
          color: #9a6500;
          font-weight: 900;
          box-shadow: 0 5px 18px #6551a51a;
        }

        .abc-container { max-width: 1180px; margin: auto; }

        .abc-hero {
          position: relative;
          overflow: hidden;
          padding: 30px;
          border-radius: 30px;
          color: white;
          background: linear-gradient(120deg, #8065e9, #aa78ec 55%, #f18ebc);
          box-shadow: 0 16px 35px #8065e933;
          animation: abc-enter .7s ease both;
        }

        .abc-hero::after {
          content: '✦';
          position: absolute;
          right: 8%;
          top: 10px;
          font-size: 100px;
          color: #ffffff30;
          animation: abc-spin 15s linear infinite;
        }

        .abc-hero h1 {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(30px, 5vw, 46px);
          line-height: 1.1;
          margin: 0 0 8px;
          font-weight: 800;
        }

        .abc-hero p { margin: 0; font-size: 16px; opacity: .95; }

        .abc-progress-wrap { margin-top: 23px; max-width: 520px; }

        .abc-progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .abc-progress-track {
          height: 12px;
          border-radius: 30px;
          background: #ffffff55;
          overflow: hidden;
        }

        .abc-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: #ffe477;
          transition: width .5s ease;
        }

        .abc-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(260px, .8fr);
          gap: 22px;
          margin-top: 24px;
          align-items: start;
        }

        .abc-card {
          background: #ffffffed;
          border: 1px solid #ffffff;
          border-radius: 27px;
          padding: 24px;
          box-shadow: 0 12px 35px #55469a12;
          animation: abc-enter .65s ease both;
        }

        .abc-card-title {
          font-family: 'Baloo 2', cursive;
          font-size: 23px;
          font-weight: 800;
          margin: 0 0 5px;
          color: #51428f;
        }

        .abc-muted { color: #85839b; font-size: 14px; font-weight: 700; }

        .abc-letter-stage {
          position: relative;
          margin: 22px 0;
          min-height: 270px;
          border-radius: 25px;
          background: linear-gradient(145deg, #fff1f7, #f0edff);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          overflow: hidden;
        }

        .abc-letter-stage::before,
        .abc-letter-stage::after {
          content: '✦';
          position: absolute;
          color: #f3b9d5;
          font-size: 35px;
          animation: abc-float 3s ease-in-out infinite;
        }

        .abc-letter-stage::before { left: 12%; top: 20%; }
        .abc-letter-stage::after { right: 13%; bottom: 18%; animation-delay: 1s; }

        .abc-big-letter {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(105px, 18vw, 155px);
          line-height: .95;
          font-weight: 800;
          text-shadow: 0 9px 0 #0000000b;
          animation: abc-bounce 2.4s ease-in-out infinite;
        }

        .abc-lower-letter {
          font-family: 'Baloo 2', cursive;
          font-size: 43px;
          font-weight: 800;
          color: #61558e;
        }

        .abc-word {
          font-size: 20px;
          font-weight: 900;
          color: #6251a3;
          margin-top: 2px;
        }

        .abc-action-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .abc-action {
          flex: 1;
          min-width: 130px;
          border: 0;
          border-radius: 16px;
          padding: 13px 17px;
          font: 900 15px 'Nunito', sans-serif;
          cursor: pointer;
          transition: .22s;
        }

        .abc-action:hover:not(:disabled) {
          transform: translateY(-3px);
          filter: brightness(1.04);
        }

        .abc-action:disabled { opacity: .4; cursor: not-allowed; }

        .abc-purple { background: #755ce0; color: white; box-shadow: 0 6px 15px #755ce033; }
        .abc-pink { background: #ffe0ed; color: #a33d70; }
        .abc-yellow { background: #ffedb5; color: #896000; }
        .abc-blue { background: #dff4ff; color: #2875a1; }

        .abc-trace-area {
          position: relative;
          height: 190px;
          margin: 15px 0;
          background: #fbfaff;
          border: 3px dashed #c7b9f5;
          border-radius: 20px;
          overflow: hidden;
          touch-action: none;
          cursor: crosshair;
        }

        .abc-trace-guide {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font: 800 125px 'Baloo 2', cursive;
          color: #e8e1fa;
          pointer-events: none;
        }

        .abc-trace-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .abc-feedback {
          margin-top: 15px;
          padding: 13px 16px;
          border-radius: 16px;
          background: #fff4d5;
          color: #876000;
          font-weight: 900;
          animation: abc-enter .3s ease both;
        }

        .abc-side-card { margin-bottom: 20px; }

        .abc-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 17px;
        }

        .abc-stat {
          border-radius: 18px;
          padding: 17px 10px;
          text-align: center;
          background: #f5f1ff;
        }

        .abc-stat:nth-child(2) { background: #fff2d7; }
        .abc-stat:nth-child(3) { background: #e8f8ff; }
        .abc-stat:nth-child(4) { background: #ffedf4; }

        .abc-stat-icon { font-size: 25px; }
        .abc-stat-number {
          display: block;
          font: 800 25px 'Baloo 2', cursive;
          color: #5848a3;
        }

        .abc-stat-label {
          color: #817c9a;
          font-size: 12px;
          font-weight: 900;
        }

        .abc-reward-box {
          border-radius: 20px;
          padding: 18px;
          background: linear-gradient(135deg, #fff5d9, #ffe8ef);
          margin-top: 16px;
        }

        .abc-reward-box h3 {
          margin: 0 0 7px;
          font: 800 20px 'Baloo 2', cursive;
          color: #98631c;
        }

        .abc-reward-number {
          font: 800 34px 'Baloo 2', cursive;
          color: #d28a17;
        }

        .abc-reward-note { font-size: 13px; color: #92774d; font-weight: 800; }

        .abc-letter-list {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 7px;
          margin-top: 15px;
        }

        .abc-letter-chip {
          border: 0;
          border-radius: 10px;
          aspect-ratio: 1;
          background: #f0edfa;
          color: #796e9c;
          font: 900 14px 'Baloo 2', cursive;
          cursor: pointer;
          transition: .2s;
        }

        .abc-letter-chip.active {
          color: white;
          background: #7961dd;
          transform: scale(1.08);
          box-shadow: 0 4px 10px #7961dd55;
        }

        .abc-letter-chip.done { background: #d9f7e8; color: #278658; }
        .abc-letter-chip.done.active { background: #7961dd; color: white; }

        .abc-quiz {
          margin-top: 20px;
          padding: 20px;
          background: #f5f1ff;
          border-radius: 20px;
          animation: abc-enter .35s ease both;
        }

        .abc-quiz-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        .abc-quiz-option {
          padding: 13px;
          border: 2px solid #e2dafa;
          border-radius: 14px;
          background: white;
          color: #5f4ca9;
          font: 900 15px 'Nunito', sans-serif;
          cursor: pointer;
          transition: .2s;
        }

        .abc-quiz-option:hover { border-color: #8067e5; transform: translateY(-2px); }

        .abc-complete {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
          padding: 13px;
          border-radius: 15px;
          background: #e4f9ed;
          color: #278253;
          font-size: 13px;
          font-weight: 900;
        }

        .abc-bottom-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin: 25px 0 10px;
        }

        .abc-footer {
          text-align: center;
          padding: 20px 0 5px;
          color: #9992b2;
          font-weight: 800;
          font-size: 13px;
        }

        @keyframes abc-enter {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes abc-bounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }

        @keyframes abc-float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-12px) rotate(25deg); }
        }

        @keyframes abc-spin { to { transform: rotate(360deg); } }

        @media (max-width: 800px) {
          .abc-layout { grid-template-columns: 1fr; }
          .abc-side-column { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .abc-side-card { margin: 0; }
        }

        @media (max-width: 560px) {
          .abc-page { padding: 13px; }
          .abc-hero { padding: 23px 19px; }
          .abc-card { padding: 17px; }
          .abc-side-column { grid-template-columns: 1fr; }
          .abc-letter-stage { min-height: 225px; }
          .abc-action { min-width: 100%; }
          .abc-letter-list { grid-template-columns: repeat(7, 1fr); }
        }
      `}</style>

      <header className="abc-topbar">
        <NavLink to="/home" className="abc-back">← Back Home</NavLink>
        <div className="abc-brand">🦉 Little Genius</div>
        <div className="abc-star-pill">⭐ {totalStars} Stars</div>
      </header>

      <main className="abc-container">
        <section className="abc-hero">
          <h1>🌈 ABC Adventure World!</h1>
          <p>Learn letters, listen to their sounds, trace them and collect stars!</p>

          <div className="abc-progress-wrap">
            <div className="abc-progress-label">
              <span>Your alphabet journey</span>
              <span>{currentLetter + 1} / {alphabetData.length}</span>
            </div>
            <div className="abc-progress-track">
              <div className="abc-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <div className="abc-layout">
          <section className="abc-card">
            <h2 className="abc-card-title">✨ Meet Your Letter</h2>
            <p className="abc-muted">Look at the letter and say it aloud!</p>

            <div className="abc-letter-stage">
              <div
                className="abc-big-letter"
                style={{ color: letter.color || '#8065e9' }}
              >
                {letter.letter}
              </div>
              <div className="abc-lower-letter">
                {letter.letter.toLowerCase()}
              </div>
              {letter.word && <div className="abc-word">🍎 {letter.word}</div>}
            </div>

            <div className="abc-action-row">
              <button className="abc-action abc-purple" onClick={pronounceLetter}>
                🔊 Listen to Letter
              </button>
              <button
                className="abc-action abc-pink"
                onClick={() => speak(`${letter.word || letter.letter}`)}
              >
                🗣️ Say the Word
              </button>
            </div>

            <div style={{ marginTop: 27 }}>
              <h2 className="abc-card-title">✏️ Letter Tracing</h2>
              <p className="abc-muted">
                Use your finger or mouse to draw the letter inside the box.
              </p>

              <div
                className="abc-trace-area"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <div className="abc-trace-guide">{letter.letter}</div>
                <svg className="abc-trace-svg">
                  {tracePoints.length > 1 && (
                    <polyline
                      points={tracePoints.map(point => `${point.x},${point.y}`).join(' ')}
                      fill="none"
                      stroke="#f17eae"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>

              <div className="abc-action-row">
                <button className="abc-action abc-blue" onClick={clearTrace}>
                  🧹 Clear Drawing
                </button>
                <button
                  className="abc-action abc-yellow"
                  onClick={() => speak(`Trace the letter ${letter.letter}`)}
                >
                  🔊 Trace Instructions
                </button>
              </div>

              {traceComplete && (
                <div className="abc-complete">
                  🎉 Letter tracing completed!
                </div>
              )}
            </div>

            <div className="abc-quiz">
              <h2 className="abc-card-title">🧠 Little Genius Quiz</h2>
              <p className="abc-muted">
                Which word starts with the letter {letter.letter}?
              </p>

              {!showQuiz ? (
                <button
                  className="abc-action abc-purple"
                  style={{ width: '100%', marginTop: 12 }}
                  onClick={() => {
                    setFeedback('');
                    setShowQuiz(true);
                  }}
                >
                  🎮 Start This Letter Quiz
                </button>
              ) : (
                <div className="abc-quiz-options">
                  {quizOptions.map((word, index) => (
                    <button
                      className="abc-quiz-option"
                      key={`${word}-${index}`}
                      onClick={() => handleAnswer(word)}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}

              {quizAwarded.includes(currentLetter) && (
                <div className="abc-complete">
                  🏆 Quiz reward collected for this letter!
                </div>
              )}
            </div>

            {feedback && <div className="abc-feedback">{feedback}</div>}

            <div className="abc-bottom-nav">
              <button
                className="abc-action abc-blue"
                onClick={previousLetter}
                disabled={currentLetter === 0}
              >
                ← Previous Letter
              </button>
              <button className="abc-action abc-purple" onClick={nextLetter}>
                Next Letter →
              </button>
            </div>
          </section>

          <aside className="abc-side-column">
            <section className="abc-card abc-side-card">
              <h2 className="abc-card-title">🏆 Your Learning Rewards</h2>
              <p className="abc-muted">Every activity helps you collect stars!</p>

              <div className="abc-stat-grid">
                <div className="abc-stat">
                  <div className="abc-stat-icon">⭐</div>
                  <span className="abc-stat-number">{totalStars}</span>
                  <span className="abc-stat-label">Total Stars</span>
                </div>

                <div className="abc-stat">
                  <div className="abc-stat-icon">🪙</div>
                  <span className="abc-stat-number">{totalCoins}</span>
                  <span className="abc-stat-label">Total Coins</span>
                </div>

                <div className="abc-stat">
                  <div className="abc-stat-icon">🎁</div>
                  <span className="abc-stat-number">{sessionStars}</span>
                  <span className="abc-stat-label">Stars This Visit</span>
                </div>

                <div className="abc-stat">
                  <div className="abc-stat-icon">📚</div>
                  <span className="abc-stat-number">{completedLetters.length}</span>
                  <span className="abc-stat-label">Letters Practised</span>
                </div>
              </div>

              <div className="abc-reward-box">
                <h3>🌟 How to Earn Stars</h3>
                <div className="abc-reward-note">Correct quiz answer: +5 ⭐</div>
                <div className="abc-reward-note">Complete letter tracing: +2 ⭐</div>
                <div className="abc-reward-note" style={{ marginTop: 9 }}>
                  Your rewards are saved automatically!
                </div>
              </div>
            </section>

            <section className="abc-card abc-side-card">
              <h2 className="abc-card-title">🔤 Alphabet Explorer</h2>
              <p className="abc-muted">Choose a letter to explore.</p>

              <div className="abc-letter-list">
                {alphabetData.map((item, index) => (
                  <button
                    key={`${item.letter}-${index}`}
                    className={`abc-letter-chip
                      ${index === currentLetter ? 'active' : ''}
                      ${completedLetters.includes(index) ? 'done' : ''}`}
                    onClick={() => {
                      setCurrentLetter(index);
                      setShowQuiz(false);
                      setTracePoints([]);
                      setTraceComplete(false);
                      setFeedback('');
                    }}
                    title={`Letter ${item.letter}`}
                  >
                    {item.letter}
                  </button>
                ))}
              </div>

              <div className="abc-complete">
                ✅ {completedLetters.length} of {alphabetData.length} letters practised
              </div>
            </section>
          </aside>
        </div>

        <footer className="abc-footer">
          Made with 💜 for Little Genius learners · Keep learning, keep shining! ✨
        </footer>
      </main>
    </div>
  );
};

export default ABCWorldPage;
