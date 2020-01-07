from flask import Flask, request, render_template, jsonify
import jwt

app = Flask('__name__')


@app.route('/')
def index():
    return "Hello"


if __name__ == '__main__':
    app.run(debug=True)