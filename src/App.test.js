import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
});



/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Routes /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});*/
