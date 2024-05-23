import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddArticel from "./pages/AddArticel";
import EditArticel from "./pages/EditArticel";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-article" element={<AddArticel />} />
            <Route path="/edit-article/:id" element={<EditArticel />} />
        </Routes>
    );
}

export default App;
