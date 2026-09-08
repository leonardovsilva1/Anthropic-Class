from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="static")

tasks = [
    {"id": 1, "text": "Aprender Flask", "done": False},
    {"id": 2, "text": "Aprender JavaScript", "done": False},
]
next_id = 3


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)


@app.route("/api/tasks", methods=["POST"])
def add_task():
    global next_id
    data = request.get_json()
    text = (data or {}).get("text", "").strip()
    if not text:
        return jsonify({"error": "texto vazio"}), 400

    task = {"id": next_id, "text": text, "done": False}
    tasks.append(task)
    next_id += 1
    return jsonify(task), 201


@app.route("/api/tasks/<int:task_id>", methods=["PATCH"])
def toggle_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = not task["done"]
            return jsonify(task)
    return jsonify({"error": "tarefa nao encontrada"}), 404


@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)
