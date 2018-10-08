import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

export const configureAdapter = () => configure({ adapter: new Adapter() });
