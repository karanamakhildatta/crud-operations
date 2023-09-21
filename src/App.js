import "./App.css";
import DataTable from "./CrudData";
import AddModel from "./AddModel";
import { useState } from "react";
import EditModel from "./EditModel";

function App() {
  const [addModel, showAddModel] = useState(false);
  const [editModel, showEditModel] = useState(true);
  const [user, setUser] = useState(false);
  const [reload, setReload] = useState(0);
  return (
    <div className="App">
      <AddModel
        showModel={showAddModel}
        show={addModel}
        setReload={setReload}
      />
      <EditModel
        showModel={showEditModel}
        show={editModel}
        user={user}
        setReload={setReload}
      />
      <DataTable
        showAddModel={showAddModel}
        setUser={setUser}
        reload={reload}
        showEditModel={showEditModel}
      />
    </div>
  );
}

export default App;
