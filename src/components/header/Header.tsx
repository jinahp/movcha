import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import chat from '../../assets/ic-chat.svg';
import './header.scss';

const Header = () => {
  const navigate = useNavigate();

  const handlePop = () => {
    alert('채팅 기능은 준비 중입니다.');
  };

  return (
    <header>
      <img
        src={logo}
        alt="logo"
        className="header-logo"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="header-btn-wrapper">
        <img
          src={chat}
          alt="chat"
          className="header-chat"
          onClick={handlePop}
        />
        <button
          className="header-btn-login"
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인
        </button>
        <button
          className="header-btn-signup"
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </button>
      </div>
    </header>
  );
};

export default Header;
