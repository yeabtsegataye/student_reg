import { useState } from "react";
import axios from "axios";
import MapStudSearched from "./MapStudSearched";
// import { Usedep } from "../hook/usedep";

const UpdateStudent = () => {
  // const { departments } = Usedep();
  /////////////////////
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  /////////////////////////////
  // const [editingName, setEditingName] = useState(false);
  // const [editingId, setEditingId] = useState(false);
  // const [editDep, setEditDep] = useState(false);
  /////////////////////////
  // const [editedName, setEditedName] = useState("");
  // const [editedId, setEditedId] = useState("");
  // const [editedDep, setEditedDep] = useState("");
  // /////////////////////////////
  // const [studid, setstudid] = useState("");
  //////////////////////////
  // function handleDoubleClickName(id) {
  //   setEditingName(true);
  //   setstudid(id);
  // }

  // const handleDoubleClickId = () => {
  //   setEditingId(true);
  // };

  // const handledep = () => {
  //   setEditDep(true);
  // };

  // const handleNameInputChange = (event) => {
  //   setEditedName(event.target.value);
  // };

  // const handleIdInputChange = (event) => {
  //   setEditedId(event.target.value);
  // };
  // const handedepInputChange = (event) => {
  //   setEditedDep(event.target.value);
  // };

  // const handleSave = () => {
  //   // Handle save logic here
  //   console.log(`Updated name: ${editedName}`);
  //   console.log(`Updated ID: ${editedId}`);
  //   console.log(`Updated dep: ${editedDep}`);
  //   setEditingName(false);
  //   setEditingId(false);
  //   setEditDep(false);
  // };
  ////////////////////////////
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  ///////////////////////////
  const handle_search = async (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (!search) {
      return;
    }
    const api = `http://localhost:8000/api?search=${search}`;
    try {
      const { data } = await axios.get(api, config);
      const users = data.user;
      // console.log(users);
      setData(users);
      if (!data) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////
  // const api3 = "http://localhost:8000/api/student";

  // const handle_updetStud = async (e) => {
  //   e.preventDefault();
  //   console.log(editedName, editedId, editedDep, studid);
  //   // const updates = await axios.put(
  //   //   api3,
  //   //   { name: editedName, ID: editedId, department: editedDep },
  //   //   config
  //   // );
  //   // console.log(updates);
  // };
  ///////////////////////////

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handle_search}
            />
            <button
              class="btn btn-outline-success"
              type="submit"
              onClick={handle_search}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      {data && <MapStudSearched data={data} />}
    </div>
  );
};

export default UpdateStudent;
