from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


users = []  
@app.route('/')
def home():
    return render_template('index.html')
  
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Basic validation
        if name and email and password:
            user = {
                'id': len(users) + 1,
                'name': name,
                'email': email
            }
            users.append(user)
            return redirect('/users')
    
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)