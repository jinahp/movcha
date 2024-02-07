import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './signUp.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
}

const SignUp = () => {
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

  return (
    <div className="signup-wrapper">
      <img
        src={logo}
        alt="logo"
        className="header-logo"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="signup-container">
        <div className="signup-title">회원가입</div>
        <form
          className="signup-input-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name" className="signup-label">
            이름
          </label>
          <input
            id="name"
            type="text"
            className="signup-input"
            placeholder="이름을 입력해주세요."
            {...register('name', {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z가-힣]+$/i,
            })}
          />
          <div className="signup-error">
            {errors.name && '이름을 입력해주세요.'}
          </div>
          <label htmlFor="email" className="signup-label">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="signup-input"
            placeholder="test@email.com"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
              maxLength: 30,
            })}
          />
          <div className="signup-error">
            {errors.email && '이메일 형식이 올바르지 않습니다.'}
          </div>
          <label htmlFor="password" className="signup-label">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="signup-input"
            placeholder="비밀번호를 입력해주세요."
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 20,
              pattern: /^[A-Za-z0-9]+$/i,
            })}
          />
          <label htmlFor="passwordConfirm" className="signup-label">
            비밀번호 확인
          </label>
          <input
            id="passwordConfirm"
            type="password"
            className="signup-input"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register('passwordConfirm', {
              required: true,
              validate: (value, { password }) => value === password,
            })}
          />
          <div className="signup-error">
            {errors.passwordConfirm && '비밀번호가 일치하지 않습니다.'}
          </div>
          <div className="signup-terms">
            <input
              type="checkbox"
              id="terms"
              {...register('terms', { required: true })}
            />
            <label htmlFor="terms" className="signup-terms-label">
              이용약관 및 개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <div className="signup-error">
            {errors.terms && '약관에 동의해주세요.'}
          </div>
          <div className="signup-button-group">
            <button
              className="signup-btn"
              disabled={!isDirty || !isValid}
              onClick={handleClick}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
