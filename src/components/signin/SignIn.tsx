import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './signIn.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInput {
  email: string;
  password: string; // number가 아닌 string으로 변경
}

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormInput>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  const handleClick = () => {
    navigate('/');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="signin-wrapper">
      <img
        src={logo}
        alt="logo"
        className="header-logo"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="signin-container">
        <form
          className="signin-input-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="signin-label">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="signin-input"
            placeholder="test@email.com"
            {...register('email', {
              required: '이메일을 입력해주세요.', // 필드가 비어 있을 때 에러 메시지
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
              maxLength: {
                value: 30,
                message: '이메일은 최대 30자여야 합니다.',
              },
            })}
          />
          <div className="signin-error">
            {errors.email && errors.email.message} {/* 에러 메시지 표시 */}
          </div>
          <label htmlFor="password" className="signin-label">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="signin-input"
            placeholder="비밀번호를 입력해주세요."
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 최대 20자여야 합니다.',
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: '영문 대소문자와 숫자만 허용됩니다.',
              },
            })}
          />
          <div className="signin-error">
            {errors.password && errors.password.message}
          </div>
          <div className="signin-password-container">
            {/* TODO: 비밀번호 이메일 찾기 구현 */}
            <div className="signin-find-password">비밀번호 찾기</div>
          </div>

          <div className="signin-button-group">
            <button
              className="signin-btn"
              disabled={!isDirty || !isValid}
              onClick={handleClick}
            >
              로그인
            </button>
            <button className="signin-btn-signup" onClick={handleSignUpClick}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
