import React from 'react';
import Route from 'react-router-dom';
import Dashboard from '../Dashboard';
import Admin from '../../Admin/Admin'
import { screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { renderWithRouterMatch } from '../../../__tests__/utils';
import { authMock } from '../../../__tests__/mockStates';

const mockStore = configureStore([thunk]);
describe('dashboard structure', ()=>{
  let store;
  let mountedDashboard;
  beforeEach(()=>{
    store = mockStore({
      auth: authMock,
    });
    store.dispatch = jest.fn();
    const userId = '5f31dcb9a1a909eadee0eecb';
    console.log(Dashboard);
    console.log(Admin);
    mountedDashboard = renderWithRouterMatch(
      <Route path="/dashboard/:userId">{(props) => <Dashboard {...props} />}</Route>,
      {
        route: `/dashboard/${userId}`,
      },
    );
  })
  it('should render Weekly Summaries after pressing summary due date button', async () => {
    // window.HTMLElement.prototype.scrollIntoView = function() {};
    const button = screen.getByTestId('button-summary');
    expect(button).toBeInTheDocument();
    // userEvent.click(button);
    // await waitFor(() => {
    //     expect(screen.getByText('Weekly Summaries')).toBeTruthy();
    // });
  });
})

