import React from 'react';
import {GridLoader} from './GridLoader';
import {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


configure({adapter: new Adapter()});
const sum = (a, b) => a + b;

describe('prop rendering', () => {
    describe('isSelected', () => {
        it('includes "email-list-item--selected" class on container when `isSelected` prop is true', () => {
            const component = mount(<GridLoader />);


        });
    });
});
