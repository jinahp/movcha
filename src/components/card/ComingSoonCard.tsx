import { MouseEvent, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DAILY_BOX_OFFICE_URL, kobisClient } from '../../api/kobis';
import noryang from '../../assets/img-noryang.webp';
import seoul from '../../assets/img-seoul.jpg';
import zzanggu from '../../assets/img-zzanggu.webp';
import aquaman from '../../assets/img-aquaman.webp';
import troll from '../../assets/img-troll.webp';
import pororo from '../../assets/img-pororo.webp';
import doti from '../../assets/img-doti.webp';
import monster from '../../assets/img-monster.webp';
import octo from '../../assets/img-octo.jpg';
import './comingSoonCard.scss';

interface Movie {
  movieNm: string;
  openDt: string;
}

interface Img {
  src: string;
  alt?: string;
}

const MOVIE_INCREMENT = 3;

const ComingSoonCard = () => {
  const [dailyResult, setDailyResult] = useState<Movie[]>([]);
  const [images, setImages] = useState<Img[]>([]);
  const [displayedMovies, setDisplayedMovies] =
    useState<number>(MOVIE_INCREMENT);

  const isTablet = useMediaQuery({ minWidth: 769 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await kobisClient.get(
          `${DAILY_BOX_OFFICE_URL}?key=${
            import.meta.env.VITE_KOBIS_KEY
          }&targetDt=20240101`,
        );
        const data: Movie[] = response.data.boxOfficeResult.dailyBoxOfficeList;
        setDailyResult(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const movieImgs: Img[] = [
      {
        src: noryang,
        alt: '노량: 죽음의 바다',
      },
      {
        src: seoul,
        alt: '서울의 봄',
      },
      {
        src: zzanggu,
        alt: '신차원! 짱구는 못말려 더 무비 초능력 대결전 ~날아라 수제김밥~',
      },
      {
        src: aquaman,
        alt: '아쿠아맨과 로스트 킹덤',
      },
      {
        src: troll,
        alt: '트롤: 밴드 투게더',
      },
      {
        src: pororo,
        alt: '뽀로로 극장판 슈퍼스타 대모험',
      },
      {
        src: doti,
        alt: '도티와 영원의 탑',
      },
      {
        src: monster,
        alt: '괴물',
      },
      {
        src: octo,
        alt: '바다 탐험대 옥토넛 어보브 앤 비욘드: 버드, 옥토경보를 울려라!',
      },
    ];

    setImages(
      movieImgs.map((img, index) => ({
        src: img.src,
        alt: `Movie Image ${index + 1}`,
      })),
    );
  }, []);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert('Sorry, this is just a demo. You cannot watch the movie.');
  };

  const handleShowMore = () => {
    setDisplayedMovies((prevCount) => prevCount + MOVIE_INCREMENT);
  };

  const cardCount = isDesktop
    ? displayedMovies
    : isTablet
    ? displayedMovies + 1
    : displayedMovies;

  return (
    <div className="coming-soon-wrapper">
      {dailyResult
        .slice(0, Math.min(cardCount, images.length))
        .map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            image={images[index]}
            handleClick={handleClick}
          />
        ))}
      {images.length > cardCount && (
        <div className="coming-soon-btn-show-more-box">
          <button
            onClick={handleShowMore}
            className="coming-soon-btn-show-more"
          >
            신작 더 보기
          </button>
        </div>
      )}
    </div>
  );
};

interface MovieCardProps {
  movie: Movie;
  image: Img;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const MovieCard = ({ movie, image, handleClick }: MovieCardProps) => {
  return (
    <div className="coming-soon-card-wrapper">
      <div className="coming-soon-card-info">
        <div className="coming-soon-card-title">{movie.movieNm}</div>
        <div className="coming-soon-card-release-date">
          개봉일: {movie.openDt}
        </div>
      </div>
      <div className="coming-soon-card-img-container" onClick={handleClick}>
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="coming-soon-card-img"
        />
        <div className="coming-soon-card-img-text">자세히 보기</div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
