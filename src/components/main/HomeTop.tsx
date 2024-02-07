import './homeTop.scss';
import arrowRight from '../../assets/ic-arrow-right.svg';
import interstellar from '../../assets/img-interstellar.jpg';
import { useNavigate } from 'react-router-dom';

const HomeTop = () => {
  return (
    <div className="home-main-wrapper">
      <button
        className="home-main-btn"
        onClick={() => {
          window.open('https://serieson.naver.com/v2/mcode/45290');
        }}
      >
        Watch Now
      </button>
      <div className="home-img-container">
        <img
          src={interstellar}
          alt="Interstellar"
          className="img-interstellar"
        />
      </div>
      <div className="home-main-top-container">
        <h1 className="home-main-title">Interstellar</h1>
        <p className="home-main-text">
          Interstellar is a 2014 science fiction film directed by Christopher
          Nolan. Starring Matthew McConaughey, Anne Hathaway, Jessica Chastain,
          and Michael Caine, the film features a team of space travelers who
          travel through a wormhole near Saturn in search of a new home for
          humanity.
        </p>
        <div className="home-main-btn-container">
          <img
            src={arrowRight}
            alt="arrow-right"
            className="home-ic-arrow-right"
          />
          <button
            className="home-main-btn-more"
            onClick={() => {
              window.open(
                'https://serieson.naver.com/v2/movie/85586?OSType=pc',
              );
            }}
          >
            View More Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeTop;
