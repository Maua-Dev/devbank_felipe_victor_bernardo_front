import { useNavigate } from "react-router-dom";
import BillGroup from "../components/BillGroup";
import Header from "../components/Header";
import Balance from "../components/Balance";
import { useState, useEffect } from "react";

interface AccountData {
  name: string;
  agency: number;
  account: string;
  current_balance: number;
}

function Withdraw() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [changed, setChanged] = useState(0);
  const [final, setFinal] = useState(0);


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

  const handleWithdraw = () => {
    if (accountData && total > 0) {
      if (total > accountData.current_balance) {
        alert("Saldo insuficiente para saque.");
        return;
      }

      const newBalance = accountData.current_balance - total;

      const updatedAccountData: AccountData = {
        ...accountData,
        current_balance: newBalance,
      };

      setAccountData(updatedAccountData);
      localStorage.setItem("accountData", JSON.stringify(updatedAccountData));

      setChanged(total);
      setFinal(newBalance);

      alert(`Valor total retirado: R$ ${total.toFixed(2)}`);
      setTotal(0);
    }
  };


  return (
    <>
      <Header name={accountData.name} agency={accountData.agency} account={accountData.account} />
      <Balance
        balance={accountData.current_balance}
        changed={changed}
        final={final}
        type="withdraw"
      />

      <div className="flex flex-col gap-5 justify-center">
        <div className="text-center mb-1">
          <p>Selecione as cédulas e a quantidade desejada de cada uma:</p>
        </div>
        <BillGroup onTotalChange={setTotal} />
        <div className="mt-5 flex items-center justify-center text-center gap-20">
          <button
            className="transition bg-blue-500 text-white font-bold rounded-lg p-2 w-[150px]"
            onClick={() => navigate("/account")}
          >
            Voltar
          </button>
          <button
            className={`transition text-white font-bold rounded-lg p-2 w-[150px] ${total > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={handleWithdraw}
            disabled={total <= 0}
          >
            Sacar
          </button>
        </div>
      </div>
    </>
  );
}

export default Withdraw;
