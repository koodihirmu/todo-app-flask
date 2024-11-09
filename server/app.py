import sqlite3

from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def defaultRoute():
    return render_template("main.html")


@app.route("/todo")
def todoRoute():
    return render_template("todo.html")


@app.errorhandler(404)
def notFound(error):
    return render_template("error.html", value=error), 404
