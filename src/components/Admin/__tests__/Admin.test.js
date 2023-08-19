import React from 'react';
import { Route } from 'react-router-dom';
import Admin from '../Admin';
import { screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { renderWithRouterMatch } from '../../../__tests__/utils';

const mockStore = configureStore([thunk]);
describe('Admin Page Structure', ()=>{
  let mountedAdminPage;
  let store;
  beforeEach(() => {
    store = mockStore({
      popupEditor: {
        popupItems: [
          {
            id: '123',
            popupName: '123',
            popupContent: '123',
          }
        ]
      }
    });
    mountedAdminPage = renderWithRouterMatch(
      <Route path="/admin">
        {(props)=><Admin {...props}/>}
      </Route>, 
      {
        store,
        route:'/admin'
      },
    );
  });

  it('test Search text in the document', ()=>{
    expect(screen.getByText('Search')).toHaveClass('input-group-text');
  });
  it('input box should update text value when one updates the input value', ()=>{
    const input = screen.getByTestId('input-admin');
    fireEvent.change(input, {target: {value: 'search 123'}});
    expect(input.value).toBe('search 123');
  });
  it('test search icon in the document', ()=>{
    const button = screen.getByTestId('search-button')
    expect(button).toBeInTheDocument();
  })
});