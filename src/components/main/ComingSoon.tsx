import ComingSoonCard from '../card/ComingSoonCard';
import './comingSoon.scss';

const ComingSoon = () => {
  return (
    <>
      <div className="coming-soon-title-wrapper">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <div className="coming-soon-title-text">
          따끈따끈한 신작! 곧 만나보실 수 있습니다.
        </div>
      </div>
      <ComingSoonCard />
    </>
  );
};

export default ComingSoon;
