import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// temporal mock
global.fetch = jest.fn(() => ({
  then: () => ({
    then: () => ({
      catch: () => ({})
    })
  })
}));
