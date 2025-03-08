from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

DOCUMENTS_FILE = "documents.json"

# Load documents from JSON file
def load_documents():
    if not os.path.exists(DOCUMENTS_FILE):
        return []
    with open(DOCUMENTS_FILE, "r") as file:
        return json.load(file)

# Save documents to JSON file
def save_documents(documents):
    with open(DOCUMENTS_FILE, "w") as file:
        json.dump(documents, file, indent=4)

# Get all documents
@app.route("/documents", methods=["GET"])
def get_documents():
    return jsonify(load_documents())

# Add a new document
@app.route("/documents", methods=["POST"])
def add_document():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    data = request.form

    if not data.get("name") or not data.get("description"):
        return jsonify({"error": "Name and Description are required"}), 400

    filename = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filename)

    documents = load_documents()
    new_doc = {
        "id": len(documents) + 1,
        "name": data["name"],
        "description": data["description"],
        "fileUrl": f"/{filename}",
        "size": f"{round(os.path.getsize(filename) / 1024, 2)} KB",
        "status": "Active"
    }

    documents.append(new_doc)
    save_documents(documents)

    return jsonify(new_doc), 201

# Edit a document
@app.route("/documents/<int:doc_id>", methods=["PUT"])
def edit_document(doc_id):
    documents = load_documents()
    doc = next((d for d in documents if d["id"] == doc_id), None)

    if not doc:
        return jsonify({"error": "Document not found"}), 404

    data = request.form

    doc["name"] = data.get("name", doc["name"])
    doc["description"] = data.get("description", doc["description"])

    if "file" in request.files:
        file = request.files["file"]
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        doc["fileUrl"] = f"/{filename}"
        doc["size"] = f"{round(os.path.getsize(filename) / 1024, 2)} KB"

    save_documents(documents)
    return jsonify(doc)

# Delete a document
@app.route("/documents/<int:doc_id>", methods=["DELETE"])
def delete_document(doc_id):
    documents = load_documents()
    new_documents = [d for d in documents if d["id"] != doc_id]

    if len(new_documents) == len(documents):
        return jsonify({"error": "Document not found"}), 404

    save_documents(new_documents)
    return jsonify({"message": "Document deleted"}), 200

def load_employees():
    with open("employees.json", "r") as file:
        return json.load(file)

@app.route('/employees', methods=['GET'])
def get_employees():
    employees = load_employees()
    return jsonify(employees)


# Save employees to JSON file
def save_employees(employees):
    with open("employees.json", "w") as file:
        json.dump(employees, file, indent=4)



@app.route("/employees", methods=["POST"])
def add_employees():
    data = request.json

    if not data.get("name") or not data.get("email"):
        return jsonify({"error": "Name and Email are required"}), 400

    employees = load_employees()
    new_user = {
        "id": len(employees) + 1,
        "name": data["name"],
        "email": data["email"],
        "status": data.get("status", "Active"),
        "access": data.get("access", "User"),
    }
    
    employees.append(new_user)
    save_employees(employees)

    return jsonify(new_user), 201

@app.route("/employees/<int:user_id>", methods=["DELETE"])
def delete_employee(user_id):
    employees = load_employees()
    new_employees = [e for e in employees if e["id"] != user_id]

    if len(new_employees) == len(employees):
        return jsonify({"error": "Employee not found"}), 404

    save_employees(new_employees)
    return jsonify({"message": "Employee deleted"}), 200


@app.route("/employees/<int:user_id>", methods=["PUT"])
def edit_employee(user_id):
    employees = load_employees()
    employee = next((e for e in employees if e["id"] == user_id), None)

    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    data = request.json
    employee["name"] = data.get("name", employee["name"])
    employee["email"] = data.get("email", employee["email"])
    employee["status"] = data.get("status", employee["status"])
    employee["access"] = data.get("access", employee["access"])

    save_employees(employees)
    return jsonify(employee), 200


if __name__ == "__main__":
    app.run(debug=True)
