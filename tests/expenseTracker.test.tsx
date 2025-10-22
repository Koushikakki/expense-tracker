import React from "react";
import {render ,screen ,fireEvent} from  '@testing-library/react';
import ExpenseTracker from '../src/App.tsx';
import '@testing-library/jest-dom/extend-expect';
import { json } from "stream/consumers";

beforeEach(()=>{
    global.fetch = jest.fn(()=> 
    Promise.resolve({
        ok : true,
        json : () => Promise.resolve([]),
        status : 200,
    })
 ) as jest.Mock;
});



