import { Component } from "react";

type BalanceProps = {
  balance: number;
  changed: number;
  final: number;
  type: string;
};

class Balance extends Component<BalanceProps> {
  render() {
    return (
      <div className="my-10 flex items-center justify-center">
        <div className="bg-sky-300 w-[700px] p-3 rounded-lg flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-lg w-[200px] text-center text-white mr-4">
            Saldo atual: R$ {this.props.balance}
          </div>
          <div className="text-blue-900 flex items-center gap-10">
            <p>
              {this.props.type === "deposit"
                ? `Quantidade depositada: ${this.props.changed}`
                : `Quantidade sacada: ${this.props.changed}`}
            </p>
            <p>Quantidade final: {this.props.final}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Balance;
