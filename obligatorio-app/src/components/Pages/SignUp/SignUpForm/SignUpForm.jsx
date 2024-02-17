import Button from "../../../UI/Button/Button";
const SignUpForm = () => {
  return (
    <>
      <form>
        <label>Username</label>
        <br />
        <input className="form-control" type="text" />
        <br />
        <label>Password</label>
        <br />
        <input className="form-control" type="password" />
        <br />
        <Button cta={"Sign Up"} classColor={"btn-primary"} />
      </form>
    </>
  );
};

export default SignUpForm;
