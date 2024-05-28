import json
from flask import Flask, request, jsonify, render_template, redirect, url_for, session

app = Flask(__name__, static_folder='static')
app.secret_key = 'your_secret_key'  

#http://localhost:5000/clear_users
USERS_FILE = 'users.txt'

try:
    with open(USERS_FILE, 'r', encoding='utf-8') as file:
        users = json.load(file)
except FileNotFoundError:
    users = []

@app.route('/clear_users')
def clear_users():
    global users
    users = []
    with open(USERS_FILE, 'w', encoding='utf-8') as file:
        file.write('[]')
    return jsonify({'message': 'All users have been cleared'})

@app.route('/')
def home():
    return render_template('registration/Registration.html')

@app.route('/auth')
def auth():
    return render_template('auth/Auth.html')

@app.route('/register')
def register_page():
    return render_template('registration/Registration.html')

@app.route('/home')
def menu():
    if 'user' in session:
        user = session['user']
        return render_template('menu/Home.html', user=user)
    return redirect(url_for('auth'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('auth'))

@app.route('/profile')
def profile():
    if 'user' in session:
        user = session['user']
        return render_template('profile/Profile.html', user=user)
    return redirect(url_for('auth'))

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['emailName']
    password = request.form['password']

    user_data = {
        'name': name,
        'email': email,
        'password': password
    }

    if any(user['email'] == email for user in users):
        return jsonify({'message': 'User with this email already exists'})

    if all(user_data.values()):
        users.append(user_data)
        with open(USERS_FILE, 'w', encoding='utf-8') as file:
            json.dump(users, file)
        return jsonify({'message': 'User registered successfully', 'redirect': url_for('auth')})
    else:
        return jsonify({'message': 'Registration failed'})

@app.route('/login', methods=['POST'])
def login():
    email = request.form['skyname']
    password = request.form['password']

    user = next((user for user in users if user['email'] == email and user['password'] == password), None)

    if user:
        session['user'] = user
        return jsonify({'message': 'Login successful', 'redirect': url_for('menu')})
    else:   
        return jsonify({'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(debug=True)
