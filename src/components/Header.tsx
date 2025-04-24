import { Component } from "react";

type HeaderProps = {
    name: string;
    agency: number;
    account: string;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <nav className="bg-blue-700 h-[100px] relative flex items-center pl-5">
        <p className="font-bold text-6xl text-white">DevBank</p>
        <div className="absolute right-10 bg-white rounded-lg h-[75px] w-[200px] px-[5px] text-blue-700 flex flex-col justify-center">
            <p>Nome: {this.props.name}</p>
            <p>Agência: {this.props.agency}</p>
            <p>Conta: {this.props.account}</p>
        </div>
      </nav>
    );
  }
}

export default Header;
