import { useNavigate } from "react-router-dom";
import BillGroup from "../components/BillGroup";
import Header from "../components/Header";
import Balance from "../components/Balance";
import { useContext, useEffect, useState } from "react";
import { AccountResponseType } from "./Account";
import { APIEndpointContext } from "../contexts/api-endpoint";

function Deposit() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const handleDeposit = () => {
    if (total > 0) {
      alert(`Valor total depositado: R$ ${total.toFixed(2)}`);
      // colocar lógica para atualizar o saldo aqui
    }
  };

  const [response, setResponse] = useState<AccountResponseType>();

  const apiContext = useContext(APIEndpointContext)?.endpoint;  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await fetch(apiContext as string)).json();

        setResponse(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <>
      {/* passar as informações do header e balance pela API, retirar os placeholders deles e adicionar funcionalidade aos botões */}
      <Header name={response?.name as string} agency={response?.agency as string} account={response?.account as string} />
      <Balance balance={ response?.current_balance as number } changed={0} final={0} type="deposit" />
      <div className="flex flex-col gap-5 justify-center">
        <div className="text-center mb-1">
          <p>Selecione as cédulas e a quantidade desejada de cada uma:</p>
        </div>
        <BillGroup onTotalChange={setTotal} />
        <div className="mt-5 flex items-center justify-center text-center gap-20">
          <button
            className="transition bg-blue-500 text-white font-bold rounded-lg p-2 w-[150px]"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
          <button
            className={`transition text-white font-bold rounded-lg p-2 w-[150px] ${
              total > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleDeposit}
            disabled={total <= 0}
          >
            Depositar
          </button>
        </div>
      </div>
    </>
  );
}

export default Deposit;
