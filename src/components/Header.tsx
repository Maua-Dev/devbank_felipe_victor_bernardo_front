import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  name: string;
  agency: string;
  account: string;
}

const Header: FC<HeaderProps> = ({ name, agency, account }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-700 h-[100px] relative flex items-center pl-5">
      {/* <p className="font-bold text-6xl text-white">DevBank</p> */}
      <button className="font-bold text-6xl text-white" onClick={() => navigate("/")}>DevBank</button>
      <div className="absolute right-10 bg-white rounded-lg h-[75px] w-[200px] px-[5px] text-blue-700 flex flex-col justify-center">
        <p>Nome: {name}</p>
        <p>Agência: {agency}</p>
        <p>Conta: {account}</p>
      </div>
    </nav>
  );
};

export default Header;
