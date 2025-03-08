import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Footer } from "@/layouts/footer";
import { useTheme } from "@/hooks/use-theme";

const NewDocumentPage = () => {
    const { theme } = useTheme();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please upload a document.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("file", file);

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:5000/documents", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload document.");
            }

            const data = await response.json();
            setMessage("Document uploaded successfully!");
            setName("");
            setDescription("");
            setFile(null);
        } catch (error) {
            setMessage("Error uploading document.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Documents</h1>

            <div className="card">
                <div className="card-header">
                    <p className="card-title">Add New Document</p>
                </div>
                <div className="card-body p-0">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                        <div>
                            <label className="text-sm font-medium">Document Name</label>
                            <input
                                type="text"
                                placeholder="Enter document name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                placeholder="Enter document description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Upload Document</label>
                            <input
                                type="file"
                                accept=".pdf,.docx,.txt"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white p-2 rounded flex items-center gap-x-2" disabled={loading}>
                            <UploadCloud size={18} />
                            {loading ? "Uploading..." : "Upload Document"}
                        </button>

                        {message && <p className="text-sm text-center text-red-500">{message}</p>}
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NewDocumentPage;
