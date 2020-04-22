import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.transactions;
    const incomeTransactions: Array<number> = [];
    const outcomeTransactions: Array<number> = [];

    transactions.forEach(item => {
      if (item.type === 'income') {
        incomeTransactions.push(item.value);

        return incomeTransactions;

      } else {
        outcomeTransactions.push(item.value);

        return outcomeTransactions;
      }
    });

    const totalIncomeTransactions: number = incomeTransactions.reduce(
      (accumulator: number, value: number) => accumulator + value,
      0,
    );

    const totalOutcomeTransactions: number = outcomeTransactions.reduce(
      (accumulator: number, value: number) => accumulator + value,
      0,
    );

    const balance: Balance = {
      income: totalIncomeTransactions,
      outcome: totalOutcomeTransactions,
      total: totalIncomeTransactions - totalOutcomeTransactions,
    };

    return balance;

  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transactions = this.transactions;

    const transaction = new Transaction({ title, value, type });

    transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
