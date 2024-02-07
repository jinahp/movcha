import './comingSoonCard.scss';
import dune2 from '../../assets/img-dune2.jpg';

interface Movie {
  title: string;
  releaseDate: string;
}

const movies: Movie[] = [
  {
    title: '듄: 파트2',
    releaseDate: '2024. 02. 28.',
  },
  {
    title: '듄: 파트2',
    releaseDate: '2024. 02. 28.',
  },
  {
    title: '듄: 파트2',
    releaseDate: '2024. 02. 28.',
  },
];

const ComingSoonCard = () => {
  const handleClick = () => {
    alert('Sorry, this is just a demo. You cannot watch the movie.');
  };

  return (
    <div className="coming-soon-wrapper">
      {movies.map((movie, index) => (
        <div key={index} className="coming-soon-card-wrapper">
          <div className="coming-soon-card-info">
            <div className="coming-soon-card-title">{movie.title}</div>
            <div className="coming-soon-card-release-date">
              개봉일: {movie.releaseDate}
            </div>
          </div>
          <div className="coming-soon-card-img-container" onClick={handleClick}>
            <img
              src={dune2}
              alt="img-poster"
              className="coming-soon-card-img"
            />
            <div className="coming-soon-card-img-text">자세히 보기</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComingSoonCard;
