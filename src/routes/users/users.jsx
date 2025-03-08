import { useEffect, useState } from "react";
import { PencilLine, Trash } from "lucide-react";
import { Footer } from "@/layouts/footer";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [accessFilter, setAccessFilter] = useState("");
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/employees")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (statusFilter) {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        if (accessFilter) {
            filtered = filtered.filter(user => user.access === accessFilter);
        }

        setFilteredUsers(filtered);
    }, [searchQuery, statusFilter, accessFilter, users]);

    const deleteEmployee = (id) => {
        fetch(`http://127.0.0.1:5000/employees/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to delete employee");
            setUsers(users.filter(user => user.id !== id));
        })
        .catch((error) => alert(error.message));
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const updatedUser = {
            ...editUser,
            name: event.target.name.value,
            email: event.target.email.value,
            status: event.target.status.value,
            access: event.target.access.value,
        };

        fetch(`http://127.0.0.1:5000/employees/${editUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers(users.map(user => (user.id === data.id ? data : user)));
            setEditUser(null);
        })
        .catch(() => alert("Error updating employee"));
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Employees</h1>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="approved">approved</option>
                    <option value="blocked">blocked</option>
                    <option value="rejected">rejected</option>
                </select>
                <select className="input" value={accessFilter} onChange={(e) => setAccessFilter(e.target.value)}>
                    <option value="">All Access Levels</option>
                    <option value="edit">edit</option>
                    <option value="view">view</option>
                    <option value="none">none</option>
                </select>
            </div>

            <div className="card">
                <div className="card-header">
                    <p className="card-title">All Employees</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        {loading && <p className="text-center p-4">Loading users...</p>}
                        {error && <p className="text-center text-red-500 p-4">{error}</p>}
                        {!loading && !error && (
                            <table className="table">
                                <thead className="table-header">
                                    <tr className="table-row">
                                        <th className="table-head">#</th>
                                        <th className="table-head">Fullname</th>
                                        <th className="table-head">Email</th>
                                        <th className="table-head">Status</th>
                                        <th className="table-head">Access</th>
                                        <th className="table-head">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user.id} className="table-row">
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">{user.name}</td>
                                            <td className="table-cell">{user.email}</td>
                                            <td className="table-cell">{user.status}</td>
                                            <td className="table-cell">{user.access}</td>
                                            <td className="table-cell">
                                                <div className="flex items-center gap-x-4">
                                                    <button className="text-blue-500" onClick={() => setEditUser(user)}>
                                                        <PencilLine size={20} />
                                                    </button>
                                                    <button className="text-red-500" onClick={() => deleteEmployee(user.id)}>
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {editUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Employee</h2>
                        <form onSubmit={handleEditSubmit}>
                            <input type="text" name="name" defaultValue={editUser.name} className="input" required />
                            <input type="email" name="email" defaultValue={editUser.email} className="input" required />
                            <select name="status" defaultValue={editUser.status} className="input">
                                <option value="approved">approved</option>
                                <option value="blocked">blocked</option>
                                <option value="rejected	">rejected	</option>
                            </select>
                            <select name="access" defaultValue={editUser.access} className="input">
                                <option value="edit">edit</option>
                                <option value="view">view</option>
                                <option value="none">none</option>
                            </select>
                            <div className="modal-actions">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
