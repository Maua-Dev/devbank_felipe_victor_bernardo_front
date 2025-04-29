type Props = {
  transactionValue: number;
  transactionDate: number;
  currentBalance: number;
  transactionType: string;
};

function TransactionCard({
  transactionValue,
  transactionDate,
  currentBalance,
  transactionType,
}: Props) {
  return (
    <div className="bg-[#0073E6]/30 text-xl text-[#0073E6] w-full p-5 rounded-lg">
      <p>Valor: R$ {transactionValue}</p>
      <p>Data: {new Date(transactionDate).toLocaleDateString()}</p>
      <p>Saldo atual: R$ {currentBalance}</p>
      <p>Tipo: {transactionType === `deposit` ? `Depósito` : `Saque`}</p>
    </div>
  );
}

export default TransactionCard;
