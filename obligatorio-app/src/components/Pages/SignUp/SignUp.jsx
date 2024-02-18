import logo from '../../calories_logo.png'
import './SignUp.css'
import SignUpForm from './SignUpForm'

const SignUp = ({ toggleSignup }) => {
  return (
    <>
      <section className='d-flex flex-md justify-content-center signup'>
        <div className='card'>
          <img src={logo} width='70' height='70' alt='Logo' />
          <h3>Registro</h3>
          <section className='card-body'>
            <SignUpForm />
            <br/>
            <a href="#" onClick={toggleSignup}>Cancelar</a>
          </section>
         
        </div>

      </section>
    </>
  )
}

export default SignUp
