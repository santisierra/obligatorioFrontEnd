const Button = ({ cta, classColor, onHandleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${classColor}`}
      onClick={onHandleClick}
    >
      {cta}
    </button>
  );
};

Button.defaultProps = {
  classColor: "btn-primary",
  cta: "Click me",
  disabled: false,
};

export default Button;
