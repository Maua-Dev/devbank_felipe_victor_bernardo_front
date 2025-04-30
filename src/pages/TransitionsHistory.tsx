import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionCard from "../components/TransactionCard";
import { useNavigate } from "react-router-dom";
import { AccountResponseType } from "./Account";

type HistoryResponseType =  {
  type: string;
  value: number;
  current_balance: number;
  timestamp: number; // timestamp
}

export function TransitionsHistory() {
  const [transactions, setTransactions] = useState<HistoryResponseType[]>([]);
  const [ account, setAccount ] = useState<AccountResponseType>()

  async function getTransactions() {

    try {

      const url = localStorage.getItem("apiEndpoint")

      const response = await ( await fetch(`${url}history`)).json();

      setTransactions(response.all_transactions as HistoryResponseType[])

      console.log(transactions)

    } catch (err) {
      
      console.log(err)

    }

  } 

  useEffect(  () => {

    const fetchAccontDetails = async () => {
      try {
        const url = localStorage.getItem("apiEndpoint");

        const data = await (await fetch(url as string)).json();

        setAccount(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccontDetails();
    getTransactions();
  }, [])

  const navigate = useNavigate();

  return (
    <div>
      <Header name={account?.name as string} agency={ account?.agency as string } account={ account?.account as string } />

      <div className="bg-[#0073E6]/60 px-5 py-3 mx-5 my-8 rounded-lg">
        <p className="text-3xl text-white ">Histórico de transações</p>
      </div>

      <div className="flex flex-col mx-5 mb-2 gap-2 justify-center items-center">
        { transactions &&
        transactions.map((transaction) => (
          <TransactionCard
            transactionValue={transaction.value}
            transactionDate={transaction.timestamp}
            currentBalance={transaction.current_balance}
            transactionType={transaction.type}
          />
        ))
        }

        {/* <div className="bg-[#0073E6]/30 text-xl text-[#0073E6] w-full p-5 rounded-lg">
          <p>asd</p>
        </div>

        <div className="bg-[#0073E6]/30 text-xl text-[#0073E6] w-full p-5 rounded-lg">
          <p>asd</p>
        </div> */}
      </div>

      <div className="flex h-full items-end justify-center m-2">
        <button
          className="transition bg-blue-500 text-white font-bold rounded-lg p-2 w-[150px]"
          onClick={() => navigate("/account")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
