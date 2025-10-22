import {render ,screen ,fireEvent,act, waitFor} from  '@testing-library/react';
import ExpenseTracker from '../src/App.tsx';
import '@testing-library/jest-dom';


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



