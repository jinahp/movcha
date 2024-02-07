import Header from '../components/header/Header';
import ComingSoon from '../components/main/ComingSoon';
import HomeTop from '../components/main/HomeTop';
import './home.scss';

const Home = () => {
  return (
    <main>
      <Header />
      <div className="home-wrapper">
        <HomeTop />
        <ComingSoon />
      </div>
    </main>
  );
};

export default Home;
