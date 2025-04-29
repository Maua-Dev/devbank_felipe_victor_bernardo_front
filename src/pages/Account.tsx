import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

interface AccountData {
  name: string;
  agency: number;
  account: string;
  current_balance: number;
}

function Account() {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("accountData");
    if (storedData) {
      setAccountData(JSON.parse(storedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!accountData) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header name={accountData.name} agency={accountData.agency} account={accountData.account} />
      <div className="my-10 flex flex-col items-center justify-center">
        <div className="bg-sky-300 w-[700px] p-3 rounded-lg flex items-center justify-between">
          <div className="text-blue-900">
            <p>O que você deseja fazer?</p>
          </div>
          <div className="bg-blue-500 p-3 rounded-lg w-[200px] text-center text-white">
            Saldo atual: {accountData.current_balance}
          </div>
        </div>
        <div className="mt-5 flex justify-between items-center w-[700px] border p-3 gap-4">
          <div className="flex-1 min-w-0 bg-sky-300 p-2 rounded-lg h-[70px] flex items-center">
            <button
              onClick={() => navigate("/deposit")}
              className="w-full p-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition h-full flex items-center justify-center"
            >
              Depositar
            </button>
          </div>
          <div className="flex-1 min-w-0 bg-sky-300 p-2 rounded-lg h-[70px] flex items-center">
            <button
              className="w-full p-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition h-full flex items-center justify-center"
              onClick={() => navigate("/withdraw")}
            >
              Sacar
            </button>
          </div>
          <div className="flex-1 min-w-0 bg-sky-300 p-2 rounded-lg h-[70px] flex items-center">
            <button
              className="w-full p-2 text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600 transition h-full flex items-center justify-center whitespace-normal"
              onClick={() => navigate("/history")}
            >
              Visualizar histórico de transações
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
