import { Link } from "react-router-dom";

const MapStudSearched = (props) => {
  const data = props.data;
  return (
    <div>
      {data.map((stud) => (
        <div key={stud._id}>
          <Link className="linksname" to={`/student/${stud._id}`}>
            <button className="btn btn-outline-primary button_student">
              {stud.name}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default MapStudSearched;
