import {render ,screen ,fireEvent,act} from  '@testing-library/react';
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
})

