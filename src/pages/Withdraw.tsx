import { useNavigate } from "react-router-dom";
import BillGroup, { BillGroupState } from "../components/BillGroup";
import Header from "../components/Header";
import Balance from "../components/Balance";
import { useEffect, useState } from "react";
import { AccountResponseType } from "./Account";

function Withdraw() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [selectedBills, setSelectedBills] = useState<BillGroupState>();
  const [response, setResponse] = useState<AccountResponseType>();

  const handleWithdraw = async () => {
    if (!selectedBills) {
      alert(`Nenhuma nota selectionada para retirar!`);
      return;
    }

    if (total > 0) {
      const url = localStorage.getItem("apiEndpoint");

      const body: { [key: number]: number } = {
        2: 0,
        5: 0,
        10: 0,
        20: 0,
        50: 0,
        100: 0,
        200: 0,
      };

      for (const bill of selectedBills.bills) body[bill.value] = bill.quantity;

      const response = await fetch(`${url}withdraw`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.status === 403) {
        alert(`Saldo insuficiente!`);
      } else {
        alert(`Valor total retirado: R$ ${total.toFixed(2)}`);
      }

      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = localStorage.getItem("apiEndpoint");

        const data = await (await fetch(url as string)).json();

        setResponse(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* passar as informações do header e balance pela API, retirar os placeholders deles e adicionar funcionalidade aos botões */}
      <Header
        name={response?.name as string}
        agency={response?.agency as string}
        account={response?.account as string}
      />
      <Balance
        balance={response?.current_balance as number}
        changed={total}
        final={((response?.current_balance as number) - total) > 0 ? ((response?.current_balance as number) - total) : 0 }
        type="withdraw"
      />
      <div className="flex flex-col gap-5 justify-center">
        <div className="text-center mb-1">
          <p>Selecione as cédulas e a quantidade desejada de cada uma:</p>
        </div>
        <BillGroup onTotalChange={setTotal} onBillsChange={setSelectedBills} />
        <div className="mt-5 flex items-center justify-center text-center gap-20">
          <button
            className="transition bg-blue-500 text-white font-bold rounded-lg p-2 w-[150px]"
            onClick={() => navigate("/account")}
          >
            Voltar
          </button>
          <button
            className={`transition text-white font-bold rounded-lg p-2 w-[150px] ${
              total > 0
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
