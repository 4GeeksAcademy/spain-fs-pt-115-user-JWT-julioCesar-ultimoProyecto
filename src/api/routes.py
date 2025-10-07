"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data["email"] or not data["password"]:
        return jsonify({"msj": "Email and password are requiered"}), 400
    
    existing_user = db.session.execute(db.select(User).where(User.email == data["email"])).scalar_one_or_none()
    

    if existing_user:
        return jsonify({"msj": "User with this email already exist"}), 400
    
    new_user = User(email = data["email"])
    new_user.set_password(data["password"])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msj": "User created successfully"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data["email"] or not data["password"]:
        return jsonify({"msj": "Email and password are requiered"}), 400
    
    user = db.session.execute(db.select(User).where(User.email == data["email"])).scalar_one_or_none()

    if user is None:
        return jsonify({"msj": "Invalid Email or Password"}), 400
    
    if user.check_password(data["password"]):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Login successfully", "token": access_token}), 200
    else:
        return jsonify({"msg": "Invalid Email or Password"}), 401
    
@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 400
    return jsonify(user.serialize()), 200