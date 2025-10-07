from flask import Flask

app = Flask(__name__)
# No secret key needed for this simple project

users = []  # Temporary storage

if __name__ == '__main__':
    app.run(debug=True)