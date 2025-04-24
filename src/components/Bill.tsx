import { Component } from "react";

type BillProps = {
  value: number;
  onChange: (value: number, quantity: number) => void; // Nova prop para atualizar a quantidade
};

class Bill extends Component<BillProps> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value) || 0;
    this.props.onChange(this.props.value, quantity); // Notifica o componente pai
  };

  render() {
    return (
      <div className="border p-[5px] rounded-xl">
        <div className="rounded-xl bg-sky-300 text-center h-[150px] w-[350px] p-[10px] mb-5">
          <div className="rounded-xl bg-blue-500 text-white text-7xl h-[125px] flex items-center justify-center font-bold">
            R$ {this.props.value}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-xl bg-sky-300 text-white h-[30px] w-[150px] flex items-center justify-center font-bold text-blue-500">
            Quantidade:
          </div>
          <input
            className="text-center"
            type="number"
            defaultValue={0}
            min={0}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Bill;
