import { Link } from "react-router-dom"; 
export default function Navbar() {
    return (
        <>
        <nav>
            <h1>Stablemate</h1>
            <h3><Link to="/home">Home</Link></h3>
            <h3><Link to="/list">List</Link></h3>
            <h3><Link to="/horse">Horse</Link></h3>
        </nav>
        </>
    )
}