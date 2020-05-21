export interface IExpense {
    store: string;
    category: string;
    amount: number;
    date: string;
    id: number;
    user_id: number;
    [key: string]: any;
}

export interface IExclude {
    store?: string | number | boolean;
    category?: string | number | boolean;
    date?: string | number | boolean;
}

export interface RootState {
    editing: {
        cellEdit: null | string;
        deletingMode: { deleting: false; deleteIds: Array<number>; inProgress: false };
    };
    screen: { width: number; height: number };
    date: { period: { start: string; end: string } };
}

export interface IAggregate extends IExpense {
    color: string;
    percent: number;
}

export interface IAggregated {
    store?: string;
    category?: string;
    amount: number;
    user_id: number;
    // Technically not applicable to aggregated expenses
    // But grabs the id of the first expense and uses it for keys in react maps
    id: number;
}
