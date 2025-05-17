import "./landing.css";

export default function Lading({ setIsLanding }) {
  const handleStart = () => {
    setIsLanding(false);
  };

  return (
    <div className="landing-page">
      <div className="title-container">
        <span role="img" aria-label="brain">
          🧠
        </span>
        <h1 className="title">멍때리기 대회</h1>
        <span role="img" aria-label="brain">
          🧠
        </span>
      </div>

      <div className="rules-container">
        <div className="rules-header">
          <span role="img" aria-label="pencil">
            📝
          </span>{" "}
          대회 규칙
        </div>
        <ol className="rules-list">
          <li>시작 버튼을 누르면 웹캠이 켜지고 멍때리기가 시작됩니다.</li>
          <li>가능한 한 오랫동안 멍을 때리세요 (움직임 없이 가만히 있기).</li>
          <li>움직임이 감지되면 게임이 종료됩니다.</li>
          <li>자신의 최고 기록에 도전해보세요!</li>
        </ol>
      </div>

      <button className="start-button" onClick={handleStart}>
        대회 시작하기
      </button>
    </div>
  );
}
