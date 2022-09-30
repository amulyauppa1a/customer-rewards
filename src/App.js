import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const getTotalRewards = (input) => {
  let result = 0;
  input.forEach((ele) => {
    while (ele > 100) {
      const test = ele - 100;
      result = Math.floor(result + 2 * test);
      ele = ele - test;
    }
    while (ele > 50) {
      const test = ele - 50;
      result = Math.floor(result + 1 * test);
      ele = ele - test;
    }
  });
  return result;
};

const getTransactions = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve([120.3, 120.6, 30.7, 50, 120]), 1000);
  });

export default function App() {
  const [value, setValue] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  const totalPoints = useMemo(() => {
    return getTotalRewards(transactions);
  }, [transactions]);

  const change = (event) => {
    if (!isNaN(event.target.value)) {
      setValue(+event.target.value);
    } else {
      console.error("numeric value required");
    }
  };

  const add = () => {
    setTransactions([...transactions, value]);
  };

  return (
    <div className="App">
      <table>
        <tr>
          <th>index</th>
          <th>Amount</th>
        </tr>
        {transactions.map((ele, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ele}</td>
          </tr>
        ))}
        <tr>
          <td>Total Points: </td>
          <td>{totalPoints}</td>
        </tr>
      </table>
      <hr />
      <label htmlFor="input">Add New Transaction:</label>
      <input id="input" value={value} onChange={change} />
      <button onClick={add}> Add </button>
    </div>
  );
}
