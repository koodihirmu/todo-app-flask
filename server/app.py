import sqlite3

from flask import Flask, jsonify, redirect, render_template, request, url_for
from flask_cors import CORS

import server.config as config

app = Flask(__name__)
CORS(app)

# demonstrating how getting keys with .env works basically
print(config.SECRET_KEY)


# factory for sqlite for making the rows fetch as dictionaries
def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


connection = sqlite3.connect("db.sqlite", autocommit=True, check_same_thread=False)
cursor = connection.cursor()
cursor.row_factory = dict_factory


@app.route("/")
def index():
    return render_template("main.html")


@app.route("/todo")
def todoRoute():
    cursor.execute("SELECT rowid as id, * FROM todo")
    todo_list = cursor.fetchall()
    return render_template("todo.html", todo_list=todo_list)


@app.route("/update", methods=["PUT"])
def update():
    if request.method == "PUT":
        req = request.get_json()
        cursor.execute(
            "UPDATE todo SET completed = NOT completed WHERE rowid = ?", [req["id"]]
        )
        print("PUTTING")
    return redirect(url_for("todoRoute"), code=201)


@app.route("/delete", methods=["DELETE"])
def delete():
    rq = request.get_json()
    cursor.execute("DELETE FROM todo WHERE rowid = ?", [rq["id"]])
    return redirect(url_for("todoRoute"), code=204)


@app.route("/add", methods=["POST"])
def add():
    rq = request.get_json()
    cursor.execute(
        "INSERT INTO todo (name, completed) VALUES (?, false)", [rq["todo-title"]]
    )
    json = jsonify({"id": cursor.lastrowid})
    return (json, 201)


@app.errorhandler(404)
def notFound(error):
    return render_template("error.html", value=error), 404


if __name__ == "__main__":
    app.run(debug=True)
