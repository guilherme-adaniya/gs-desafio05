import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
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
    const totalIncome = this.transactions.reduce((total, next) => {
      if (next.type === 'income') {
        return total + next.value;
      }
      return total;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, next) => {
      if (next.type === 'outcome') {
        return total + next.value;
      }
      return total;
    }, 0);

    const total = totalIncome - totalOutcome;
    return { income: totalIncome, outcome: totalOutcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
