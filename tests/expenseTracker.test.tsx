import {render ,screen ,fireEvent,act, waitFor} from  '@testing-library/react';
import ExpenseTracker from '../src/App.tsx';
import '@testing-library/jest-dom';
import { Vault } from 'lucide-react';


beforeEach(()=>{
    global.fetch = jest.fn(()=> 
    Promise.resolve({
        ok : true,
        json : () => Promise.resolve([]),
        status : 200,
    })
 ) as jest.Mock;
});

afterEach(()=>{
    jest.clearAllMocks();
});

test('render Add Expense button',async ()=>{
    await act(async ()=>{
        render(<ExpenseTracker/>);
    });
    
    const addButton = screen.getByText(/Add Expense/i);
    expect(addButton).toBeInTheDocument();
});

test('opens model when click on add Expenses ',async ()=>{
    await act (async ()=>{
        render(<ExpenseTracker/>);
    });

    const addButton = screen.getByText(/Add Expense/i);
    fireEvent.click(addButton);

    const model = await screen.getByText(/Add New Expense/i);
    expect(model).toBeInTheDocument();

});

test('shows alert message when input field is empty',async()=>{
    window.alert = jest.fn();

    await act (async ()=>{
        render(<ExpenseTracker/>);
    });

    
    fireEvent.click(screen.getByText(/Add Expense/i));

    const addButton = await screen.getAllByRole("button",{name :/Add Expense/i });
    const submitButton= addButton[1];
    fireEvent.click(submitButton);

    await waitFor(()=>{
        expect(window.alert).toHaveBeenCalledWith("Enter all the data fields");
    });

});

test('close model on clicking cancel',async()=>{
   await act(async()=>{
    render(<ExpenseTracker/>);
   });

   const addExpense = await screen.getByText(/Add Expense/i);
   fireEvent.click(addExpense);

   fireEvent.click(screen.getByText(/Cancel/i));
   await waitFor(()=>{
    expect(screen.queryByText(/Add New Expense/i)).not.toBeInTheDocument();
   });
});


const mockExpenses = [{
    id : '1',
    description : 'Gas',
    amount : 10.0,
    category : 'Transport',
    date : '2025-10-20',
},];

test('adds a new expense and display it',async()=>{
    const newExpense = {
            id: '2',
            description: 'Groceries',
            amount: 25.0,
            category: 'Food',
            date: new Date().toISOString().split('T')[0],
        };

    jest.spyOn(global,'fetch').mockResolvedValueOnce({
        ok : true,
        json : async ()=> [],
    } as Response);

    await act (async()=>{
        render(<ExpenseTracker/>);
    });

    fireEvent.click(screen.getByText(/Add Expense/i));

    fireEvent.change(screen.getByPlaceholderText(/Description/i),{
        target : {value : newExpense.description},
    });

    fireEvent.change(screen.getByPlaceholderText(/0.00/i),{
        target : {value : newExpense.amount},
    });

    fireEvent.change(screen.getByDisplayValue(/Category/i),{
        target : {value : newExpense.category},
    });

    fireEvent.change(screen.getByDisplayValue(newExpense.date),{
        target : {value : newExpense.date},
    });


    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok : true,
        json : async ()=>({}),
    } as Response);

    jest.spyOn(global,'fetch').mockResolvedValueOnce({
        ok : true,
        json : async ()=>[newExpense],
    } as Response);


    const submitButton = await screen.getAllByRole("button",{name :/Add Expense/i });

    fireEvent.click(submitButton[1]);

    await waitFor(()=>{
        expect(screen.getByText(newExpense.description)).toBeInTheDocument();
    });


})