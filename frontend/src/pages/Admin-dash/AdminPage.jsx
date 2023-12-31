import { NavLink } from "react-router-dom";
import "./AdminPage.scss";
import Header from "../../components/Header/Header";

function AdminPage() {
  return (
    <div className="page-container-box">
      <Header />
      <div className="page-container">
        <h1 className="admin-title">Admin Page</h1>
        <NavLink to="/addvideos" className="link-add-video-link">
          Adding a video
        </NavLink>
        <NavLink to="/editvideos" className="link-edit-video-link">
          Editing a video
        </NavLink>
        <NavLink to="/deletevideos" className="link-delete-video-link">
          Deleting a video
        </NavLink>
        <NavLink to="/editviewers" className="link-edit-viewer-link">
          Editing a viewer
        </NavLink>
      </div>
    </div>
  );
}
export default AdminPage;
