import { Component } from "react";
import Bill from "./Bill";

interface BillData {
  value: number;
  quantity: number;
}

interface BillGroupState {
  bills: BillData[];
}

type BillGroupProps = {
  onTotalChange?: (total: number) => void;
};

class BillGroup extends Component<BillGroupProps, BillGroupState> {
  state: BillGroupState = {
    bills: [
      { value: 2, quantity: 0 },
      { value: 5, quantity: 0 },
      { value: 10, quantity: 0 },
      { value: 20, quantity: 0 },
      { value: 50, quantity: 0 },
      { value: 100, quantity: 0 },
      { value: 200, quantity: 0 },
    ],
  };

  handleBillChange = (value: number, quantity: number) => {
    this.setState(
      (prevState: BillGroupState) => ({
        bills: prevState.bills.map((bill) =>
          bill.value === value ? { ...bill, quantity } : bill
        ),
      }),
      () => {
        if (this.props.onTotalChange) {
          this.props.onTotalChange(this.calculateTotal());
        }
      }
    );
  };

  calculateTotal = (): number => {
    return this.state.bills.reduce(
      (total, bill) => total + bill.value * bill.quantity,
      0
    );
  };

  render() {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center text-center gap-5">
          {this.state.bills.slice(0, 3).map((bill) => (
            <Bill
              key={bill.value}
              value={bill.value}
              onChange={this.handleBillChange}
            />
          ))}
        </div>
        <div className="flex items-center justify-center text-center gap-5">
          {this.state.bills.slice(3).map((bill) => (
            <Bill
              key={bill.value}
              value={bill.value}
              onChange={this.handleBillChange}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BillGroup;
