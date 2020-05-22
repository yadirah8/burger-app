import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from  'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach (() => {
        wrapper = shallow(<BurgerBuilder onInitIngredient = {() => {}} />);
    });
    it('should render <BuildControl /> when receiving ingredients', () => {
        wrapper.setProps({ing: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

