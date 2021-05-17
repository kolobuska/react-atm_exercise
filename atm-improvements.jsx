const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    let value = Number(event.target.value);
    checkAllValid(value, isDeposit);
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    const mode = event.target.value;
    setAtmMode(mode);
    const isItDeposit = mode == "Deposit" ? true : false;
    setIsDeposit(isItDeposit);
    checkAllValid(deposit, isItDeposit);
  };

  const checkAllValid = (value, isItDeposit) => {
    setValidTransaction(false);
    setDeposit(value);
    if ((value <= 0) || (!isItDeposit && value > totalState))
      return;
    setValidTransaction(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      { atmMode !== "" &&
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
      }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
