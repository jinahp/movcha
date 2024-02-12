import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import chat from '../../assets/ic-chat.svg';
import './header.scss';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatBoxRef.current &&
        !chatBoxRef.current.contains(event.target as Node) &&
        !isDescendant(chatBoxRef.current, event.target as Node) &&
        !(event.target as HTMLElement).classList.contains('header-chat')
      ) {
        setShowChatBox(false);
      }
    };

    const handleScroll = () => {
      if (chatBoxRef.current) {
        const scrollTop = chatBoxRef.current.scrollTop;
        if (scrollTop > lastScrollTopRef.current) {
          setShowChatBox(false);
        }
        lastScrollTopRef.current = scrollTop;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isDescendant = (parent: Node, child: Node) => {
    let node = child.parentNode;

    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  };

  const handleChatClick = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <header>
      <img
        src={logo}
        alt="logo"
        className="header-logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="header-btn-wrapper">
        <img
          src={chat}
          alt="chat"
          className="header-chat"
          onClick={handleChatClick}
        />
        <div
          className={`header-chat-box scrollBar ${showChatBox ? 'active' : ''}`}
          ref={chatBoxRef}
        >
          <div className="header-chat-title">
            <span>🔔알림이 도착했습니다.</span>
          </div>
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="header-chat-content">
              <span>이곳에 알림 내용이 표시됩니다.</span>
              <hr />
            </div>
          ))}
        </div>
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
