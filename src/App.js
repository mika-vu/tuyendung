import { Container, TextField } from "@material-ui/core";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useEffect, useState } from "react";

const dataOutput = [];

function App() {
  const [dataInput, setDataInput] = useState();

  useEffect(() => {
    const salary = [];
    const budget = [];

    const data = String(dataInput).trim().replace(/\n/g, ",").split(",");
    if (isInvald(dataInput, data, budget, salary)) {
      data.forEach((e, i) => {
        if (i > 0 && i % 2 === 0) {
          salary[i / 2 - 1] = e;
        } else if (i > 0) {
          budget[(i - 1) / 2] = {
            value: Number(e.split(" ")[1]),
            number: Number(e.split(" ")[0]),
          };
        }
      });
      if (budget.length === salary.length && salary.length <= Number(data[0])) {
        handleOutput(budget, salary, Number(data[0]));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInput]);

  const isInvald = (str, data, budget, salary) => {
    if (Number(data[0]) * 2 + 1 < data.length) {
      alert("test case: " + Number(data[0]));
    }
    if (data.length < 0 || data.length > 101) {
      alert("0 < N <= 100");
    }
    if (budget[budget.length - 1]) {
      if (
        budget[budget.length - 1].value < 0 ||
        budget[budget.length - 1].value > 3000
      ) {
        alert("0 <= budget <= 3000");
      }
      if (
        budget[budget.length - 1].number < 0 ||
        budget[budget.length - 1].number > 100
      ) {
        alert("0 < k <= 100");
      }
    }
    if (salary[salary.length - 1]) {
      if (
        salary[salary.length - 1].find(
          (e) => (Number(e) <= 0 || Number(e)) > 100
        )
      ) {
        alert("0 < salary[i] <= 100(0 <= i < k)");
      }
    }

    if (String(str)[String(str).length - 1] !== "\n") {
      const input = String(str).trim().replace(/\s+/g, ",");
      if (input !== "undefined") {
        const lastIndex = input.lastIndexOf(",");
        if (lastIndex > 0) {
          const lastInput = input.slice(lastIndex + 1);
          return Number(lastInput);
        }
        return false;
      }
      return false;
    }
    return false;
  };

  const handleOutput = (budget, salary) => {
    salary.forEach((i, index) => {
      const arr = i.split(" ");
      if (arr.length > 0) {
        const currentRound = {
          remainingBudget: budget[index].value,
          sortAscendingSalary: [],
          total: 0,
        };
        sortUpAscending(arr, currentRound.sortAscendingSalary);
        if (budget[index].number === currentRound.sortAscendingSalary.length) {
          currentRound.sortAscendingSalary.forEach((e) => {
            if (Number(e) <= currentRound.remainingBudget) {
              currentRound.total += 1;
              currentRound.remainingBudget -= Number(e);
            }
          });
          dataOutput[index] = currentRound.total;
        }
      }
    });
  };

  const sortUpAscending = (array, sorted) => {
    const copied = array.slice();
    const minValue = { index: 0, value: array[0] };
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= minValue.value) {
        minValue.value = array[i];
        minValue.index = i;
      }
    }
    sorted.push(minValue.value);
    copied.splice(minValue.index, 1);
    if (copied.length > 0) {
      sortUpAscending(copied, sorted);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <PerfectScrollbar>
        <Container maxWidth="xs">
          <br />
          <br />
          <TextField
            fullWidth
            type="number"
            inputMode="numeric"
            label="Input"
            variant="outlined"
            minRows={3}
            multiline
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
          />
          <br />
          <br />
          <TextField
            // disabled
            fullWidth
            label="Output"
            variant="outlined"
            minRows={3}
            multiline
            value={dataOutput.join("\n")}
          />
        </Container>
      </PerfectScrollbar>
    </div>
  );
}

export default App;
