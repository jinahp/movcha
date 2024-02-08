import axios from 'axios';

export const BASE_URL = 'http://www.kobis.or.kr';

// 일별 박스오피스 조회
export const DAILY_BOX_OFFICE_URL =
  '/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';

// 주간 박스오피스 조회
export const WEEKLY_BOX_OFFICE_URL =
  '/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json';

// 영화 목록 조회
export const MOVIE_LIST_URL =
  '/kobisopenapi/webservice/rest/movie/searchMovieList.json';

// 영화 상세정보 조회
export const MOVIE_DETAIL_URL =
  '/kobisopenapi/webservice/rest/movie/searchMovieInfo.json';

export const kobisClient = axios.create({
  baseURL: BASE_URL,
});
