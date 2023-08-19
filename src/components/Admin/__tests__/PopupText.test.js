import React from 'react';
import PopUpText from '../PopupText';
import { screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {renderWithProvider} from '../../../__tests__/utils';

const mockStore = configureStore([thunk]);
describe('PopUpText tests', ()=>{
  let store;
  beforeEach(()=>{
    store = mockStore({});
    renderWithProvider(<PopUpText key={1} title="title" content="content" id="123"/>, {store});
  });

  it('PopUpText has titles', ()=>{
    const title = screen.getByText('title');
    expect(title).toHaveClass('m-header');
  })

  it('PopUpText has text area', ()=>{
    const textArea = screen.getByTestId('text-area', {name: /Editor/i});
    expect(textArea).toHaveStyle('visibility:visible;');
  })

  it('backup button in the document', ()=>{
    const button = screen.getByRole('button', {name: /Backup/i});
    expect(button).toBeTruthy();
    expect(button).toHaveClass('ml-1 p-1 align-middle btn btn-warning');
  })

  it('has Apply button in the footer', ()=>{
    const button = screen.getByRole('button', {name: /Apply/i});
    expect(button).toHaveClass('ml-1 p-1 align-middle btn btn-success');
  })

  it('has Restore button in the footer', ()=>{
    const button = screen.getByRole('button', {name: /Restore/i});
    expect(button).toHaveClass('btn btn-outline-info');
  })

  it('test pop modals when pressing the button two times', ()=>{
    const button = screen.getByRole('button', {name: /Backup/i});
    fireEvent.click(button);
    fireEvent.click(button);
    const text = screen.findByText('Are you sure you want to save this data to backup store. This action can not be undo.');
    expect(text).toBeTruthy();
  })
})