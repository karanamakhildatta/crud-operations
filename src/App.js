import "./App.css";
import DataTable from "./CrudData";
import AddModel from "./AddModel";
import { useState } from "react";
import EditModel from "./EditModel";
import DeleteModel from "./DeleteModel";

function App() {
  const [addModel, showAddModel] = useState(false);
  const [editModel, showEditModel] = useState(false);
  const [deleteModel, showDeleteModel] = useState(false);
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
      <DeleteModel
        showModel={showDeleteModel}
        show={deleteModel}
        user={user}
        setReload={setReload}
      />
      <DataTable
        showAddModel={showAddModel}
        setUser={setUser}
        reload={reload}
        showEditModel={showEditModel}
        showDeleteModel={showDeleteModel}
      />
    </div>
  );
}

export default App;
