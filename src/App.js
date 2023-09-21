import "./App.css";
import DataTable from "./CrudData";
import AddModel from "./AddModel";
import { useState } from "react";

function App() {
  const [addModel, showAddModel] = useState(true);
  const [reload, setReload] = useState(0);
  return (
    <div className="App">
      <AddModel
        showModel={showAddModel}
        show={addModel}
        setReload={setReload}
      />
      <DataTable showAddModel={showAddModel} reload={reload} />
    </div>
  );
}

export default App;
