import React from 'react';
import AutoUpdate from '../index';
import {mount} from 'enzyme';

describe(('auto update tests'), ()=>{
  let autoUpdate;
  let mockState;
  beforeEach(()=>{
    mockState = jest.spyOn(React, 'useState').mockImplementationOnce(()=>[true, ()=>null]);
    autoUpdate = mount(<AutoUpdate />);
  })
  it('expect alert shows up if the initial state is set to be true', ()=>{
    expect(mockState).toBeCalled();
    expect(autoUpdate.text().includes('The Highest Good Network application has updated! Please refresh this page after saving your work to apply the latest updates and bug fixes.')).toBe(true);
  })
})