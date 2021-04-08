import Expire from "./Expire";
const Alert = (props) => {
  return (
    <div>
      {props.show && (
        <Expire delay={props.time}>
          <div className={"alert alert-".concat(props.type)} role="alert">
            {props.message}
          </div>
        </Expire>
      )}
    </div>
  );
};
export default Alert;