from flask import Flask, render_template, request, redirect, url_for
import datetime
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
        
        
        # Enhanced validation
        errors = []
        
        if not name:
            errors.append("Name is required")
        elif len(name) < 2:
            errors.append("Name must be at least 2 characters")
            
        if not email:
            errors.append("Email is required")
        elif '@' not in email:
            errors.append("Please enter a valid email address")
            
        if not password:
            errors.append("Password is required")
        elif len(password) < 6:
            errors.append("Password must be at least 6 characters")
        
        # Check for duplicate email
        if any(user['email'] == email for user in users):
            errors.append("Email address already registered")
        
        if not errors:
            # Create user with timestamp
            user = {
                'id': len(users) + 1,
                'name': name,
                'email': email,
                'registered_at': datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
            }
            users.append(user)
            return redirect('/users')
        else:
            # In a real app, you'd show these errors to the user
            print("Validation errors:", errors)
            return redirect('/register')
    
    return render_template('register.html')

@app.route('/users')
def users_list():
    return render_template('users.html', users=users)

@app.route('/user/delete/<int:user_id>')
def delete_user(user_id):
    global users
    users = [user for user in users if user['id'] != user_id]
    return redirect('/users')  


if __name__ == '__main__':
    app.run(debug=True)