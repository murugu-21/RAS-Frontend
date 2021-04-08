import "./Addfooditems.css";

const checkAvailableComplement = (index, props) => {
  return (item) => {
    if (props.complement[index] === item) return true;
    return !props.complement.includes(item);
  };
};

const Complement = (props) => {
  return (
    <div>
      {props.complement.map((food, index) => {
        return (
          <div key={index} className="dropdowns form-field col-12">
            <label>
              complement:
              <select
                id={index}
                value={props.complement[index]}
                onChange={(event) => props.handleComplementName(event, index)}
              >
                {props.availableComplement
                  .filter(checkAvailableComplement(index, props))
                  .map((item, i) => {
                    return (
                      <option key={index * 1000 + i} value={item}>
                        {item.toString().toUpperCase()}
                      </option>
                    );
                  })}
              </select>
              {index !== 0 && (
                <button
                  type="button"
                  className="removebtn"
                  onClick={() => props.removeComplement(index)}
                >
                  <i class="fa fa-trash" />
                </button>
              )}
            </label>
          </div>
        );
      })}
      <div className="form-field col-12">
        <button
          className="add-btn"
          type="button"
          onClick={(e) => props.addComplement(e)}
        >
          add
        </button>
      </div>
      <div className="form-field col-12">
        <input type="file" onChange={(event) => props.handleImage(event)} />
      </div>
    </div>
  );
};

export default Complement;
