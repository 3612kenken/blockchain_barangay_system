from flask import Flask, request, jsonify
from pymongo import MongoClient
from datacleaning import clean_user_data, clean_database_data  # Import the cleaning functions
import pandas as pd  # Import pandas for data cleaning

app = Flask(__name__)

postdata = {
        "_id": 0,
        "employee_id": "CL2024-009",
        "username": "admin",
        "password": "d033e22ae348aeb5660fc2140aec35850c4da997",
        "userlevel": "Administrator"
    }

# MongoDB connection
DB_URI = "mongodb://localhost:27017/"
cluster = MongoClient(DB_URI)
db = cluster["db_brgyprofile"]
collection = db["tbl_users"]

# collection.insert_one(postdata) 

@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        # Get data from the request
        data = request.json
        if not data:
            return jsonify({"error": "Empty request body"}), 400
        
        # Clean and validate the data
        cleaned_data = clean_user_data(data)
        if isinstance(cleaned_data, str):  # If validation fails, return the error message
            return jsonify({"error": cleaned_data}), 400
        
        # Insert cleaned data into the MongoDB collection
        collection.insert_one(cleaned_data)
        return jsonify({"message": "User added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        # Retrieve all documents from the collection
        users = list(collection.find({}, {"_id": 0}))  # Exclude the MongoDB `_id` field
        
        # Clean the data using the clean_database_data function
        users = clean_database_data(users)
        
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update_user/<employee_id>', methods=['PUT'])
def update_user(employee_id):
    try:
        # Get data from the request
        data = request.json
        if not data:
            return jsonify({"error": "Empty request body"}), 400
        
        # Clean and validate the data
        cleaned_data = clean_user_data(data)
        if isinstance(cleaned_data, str):  # If validation fails, return the error message
            return jsonify({"error": cleaned_data}), 400
        
        # Update the user in the MongoDB collection
        result = collection.update_one({"employee_id": employee_id}, {"$set": cleaned_data})
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({"message": "User updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask app at http://127.0.0.1:5000")  # Log the API URI
    app.run(debug=True)
