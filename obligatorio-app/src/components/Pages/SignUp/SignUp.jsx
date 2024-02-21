import logo from '../../calories_logo.png'
import './SignUp.css'
import SignUpForm from './SignUpForm'
import { useNavigate } from "react-router-dom";

const SignUp = ({ toggleSignup }) => {

  //const dispatcher = useDispatch();
  const navigator = useNavigate();

  const goToLogin = () => {
    navigator("/login");//
   // dispatcher(onLogout());
  };

  return (
    <>
      <section className='d-flex flex-md justify-content-center signup'>
        <div className='card'>
          <img src={logo} width='70' height='70' alt='Logo' />
          <h3>Registro</h3>
          <section className='card-body'>
            <SignUpForm />
            <br/>
            <a href="#" onClick={goToLogin}>Cancelar</a>
          </section>
         
        </div>

      </section>
    </>
  )
}

export default SignUp
