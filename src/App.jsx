import { Fragment } from "react";
import { filmsMock } from "./mocks/filmsMock";
import Autocomplete from "./components/Autocomplete";

const App = () => {
  return (
    <Fragment>
      <h1>Autocomplete component</h1>
      <Autocomplete labels={filmsMock} name="Film" />
    </Fragment>
  );
};

export default App;
