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
    <div>
      <p>Valor: {transactionValue}</p>
      <p>Data: {transactionDate}</p>
      <p>Saldo atual: {currentBalance}</p>
      <p>Tipo: {transactionType}</p>
    </div>
  );
}

export default TransactionCard;
