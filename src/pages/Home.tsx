import Header from '../components/header/Header';
import HomeMain from '../components/main/HomeMain';
import './home.scss';

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-wrapper">
        <HomeMain />
      </div>
    </>
  );
};

export default Home;
