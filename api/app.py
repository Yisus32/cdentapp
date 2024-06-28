from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import abort

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cedent.db'
db = SQLAlchemy(app)

# Define the model
class Roles (db.Model):
      id = db.Column(db.Integer, primary_key=True, autoincrement=True)
      name_rol = db.Column(db.String(80), nullable=False)
      permissions= db.Column(db.String(80), nullable=False)

      def serialize(self):
          return {
              'id': self.id,
              'name_rol': self.name_rol,
              'permissions': self.permissions
          }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    lastname = db.Column(db.String(80), unique=False, nullable=False)
    rol_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    dni = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'lastname': self.lastname,
            'rol_id': self.rol_id,
            'dni': self.dni,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'password': self.password,
            'created_at': self.created_at
        }

class Payment(db.Model):
      id = db.Column(db.Integer, primary_key=True, autoincrement=True)
      user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
      refCode = db.Column(db.String(80), nullable=False)
      amount = db.Column(db.Float, nullable=False)
      type = db.Column(db.String(80), nullable=False)
      created_at = db.Column(db.DateTime, server_default=db.func.now())

      def serialize(self):
          return {
              'id': self.id,
              'user_id': self.user_id,
              'refCode': self.refCode,
              'type': self.type,
              'amount': self.amount,
              'created_at': self.created_at
          }


class Appointments (db.Model):
      id = db.Column(db.Integer, primary_key=True, autoincrement=True)
      user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
      date = db.Column(db.DateTime, server_default=db.func.now())
      patient_id = db.Column(db.String(80), nullable=False)
      status = db.Column(db.String(80), nullable=False)
      state = db.Column(db.String(80), nullable=False)
      doctor_id = db.Column(db.String(80), nullable=False)
      created_at = db.Column(db.DateTime, server_default=db.func.now())

      def serialize(self):
          return {
              'id': self.id,
              'user_id': self.user_id,
              'date': self.date,
              'patient_id': self.patient_id,
              'status': self.status,
              'state': self.state,
              'doctor_id': self.doctor_id,
              'created_at': self.created_at
          }

class MedicalHistory (db.Model):
      id = db.Column(db.Integer, primary_key=True, autoincrement=True)
      user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
      age = db.Column(db.Integer, nullable=False)
      child_number = db.Column(db.Integer, nullable=False)
      weight = db.Column(db.Float, nullable=False)
      height = db.Column(db.Float, nullable=False)
      bloodtype = db.Column(db.String(80), nullable=False)
      disease = db.Column(db.String(80), nullable=False)
      description_disease = db.Column(db.String(80), nullable=False)
      medicines = db.Column(db.String(80), nullable=False)
      description_medicines = db.Column(db.String(80), nullable=False)
      sugery = db.Column(db.String(80), nullable=False)
      description_sugery = db.Column(db.String(80), nullable=False)
      allergies = db.Column(db.String(80), nullable=False)
      description_allergies = db.Column(db.String(80), nullable=False)

      def serialize(self):
          return {
              'id': self.id,
              'user_id': self.user_id,
              'age': self.age,
              'child_number': self.child_number,
              'weight': self.weight,
              'height': self.height,
              'bloodtype': self.bloodtype,
              'disease': self.disease,
              'description_disease': self.description_disease,
              'medicines': self.medicines,
              'description_medicines': self.description_medicines,
              'sugery': self.sugery,
               'description_sugery': self.description_sugery,
              'allergies': self.allergies,
              'description_allergies': self.description_allergies
          }


# Create a new user automatically
with app.app_context():
    db.create_all()



#Funciones de User

#Crear y Listar un usuario

@app.route('/users', methods=['GET'])
def get_users():
  users = User.query.all()
  response = jsonify({ 'users' :[user.serialize()  for user in users]})
  response.headers.add("Access-Control-Allow-Origin", "*")

  return response

@app.route('/users', methods=['POST'])
def create_user():
  data = request.get_json()
  user = User(name=data['name'], lastname=data['lastname'], dni=data['dni'], phone=data['phone'], email=data['email'], address=data['address'], password = data ['password'] , rol_id=data['rol_id'])
  db.session.add(user)
  db.session.commit()

  return jsonify({ "message" : "Usuario Creado con Exito!", "user": user.serialize()}), 201


#Obtener un Usuario

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
  user = User.query.get(id)
  if not user:
    return jsonify({ "message" : "Usuario no encontrado!"}), 404
  return jsonify(user.serialize())


#Editar un Usuario

@app.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
  user = User.query.get(id)
  if not user:
    return jsonify({ "message" : "Usuario no encontrado!"}), 404

  data = request.get_json()
  user.name = data['name']
  user.lastname = data['lastname']
  user.dni = data['dni']
  user.phone = data['phone']
  user.email = data['email']
  user.address = data['address']
  user.password = data['password']
  user.rol_id = data['rol_id']

  db.session.commit()
  return jsonify({ "message" : "Usuario Actualizado con Exito!", "user": user.serialize()})

#Eliminar un Usuario
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
  user = User.query.get(id)
  if user:
        historial_medico = MedicalHistory.query.filter_by(user_id=id).first()
        if historial_medico:
            db.session.delete(historial_medico)
        db.session.delete(user)
        db.session.commit()
  return jsonify({ "message" : "Usuario Eliminado con Exito!"})

#Funciones de Payment

# Crear y Listar un Pago
@app.route('/payments', methods=['GET'])
def get_payments():
  payments = Payment.query.all()
  response = jsonify({ 'payments' :[payment.serialize()  for payment in payments]})
  response.headers.add("Access-Control-Allow-Origin", "*")

  return response

@app.route('/payments', methods=['POST'])
def create_payment():
  data = request.get_json()
  payment = Payment(user_id=data['user_id'], refCode=data['refCode'], amount=data['amount'], type=data['type'])
  db.session.add(payment)
  db.session.commit()

  return jsonify({ "message" : "Pago Creado con Exito!", "payment": payment.serialize()}), 201

 #obtener un pago
@app.route('/payment/<int:id>', methods=['GET'])
def get_payment(id):
  payment = Payment.query.get(id)
  if not payment:
    return jsonify({ "message" : "Pago no encontrado!"}), 404
  return jsonify(payment.serialize())

#Editar un Pago
@app.route('/payment/<int:id>', methods=['PUT'])
def update_payment(id):
  payment = Payment.query.get(id)
  if not payment:
    return jsonify({ "message" : "Pago no encontrado!"}), 404

  data = request.get_json()
  payment.user_id = data['user_id']
  payment.refCode = data['refCode']
  payment.amount = data['amount']
  payment.type = data['type']

  db.session.commit()
  return jsonify({ "message" : "Pago Actualizado con Exito!", "payment": payment.serialize()})

#Eliminar un Pago
@app.route('/payment/<int:id>', methods=['DELETE'])
def deletepayment(id):
  payment = Payment.query.get(id)
  if not payment:
    return jsonify({ "message" : "Pago no encontrado!"}), 404

  db.session.delete(payment)
  db.session.commit()
  return jsonify({ "message" : "Pago Eliminado con Exito!"})


#Funciones de Appointment


# Crear y Listar una Cita
@app.route('/appointments', methods=['GET'])
def get_appointments():
  appointments = Appointments.query.all()
  response = jsonify({ 'appointments' :[appointment.serialize()  for appointment in appointments]})
  response.headers.add("Access-Control-Allow-Origin", "*")

  return response

@app.route('/appointments', methods=['POST'])
def create_appointment():
  data = request.get_json()
  formattedDateTime = datetime.strptime(data['date'], '%Y-%m-%d').date()
  appointment = Appointments(user_id=data['user_id'], date=formattedDateTime, patient_id=data['patient_id'], status=data['status'], state = data['state'], doctor_id=data['doctor_id'])
  db.session.add(appointment)
  db.session.commit()

  return jsonify({ "message" : "Cita Creada con Exito!", "appointment": appointment.serialize()}), 201

#obtener una cita
@app.route('/appointment/<int:id>', methods=['GET'])
def get_appointment(id):
  appointment = Appointments.query.get(id)
  if not appointment:
    return jsonify({ "message" : "Cita no encontrada!"}), 404
  return jsonify(appointment.serialize())

#Editar una Cita
@app.route('/appointment/<int:id>', methods=['PUT'])
def update_appointment(id):
  appointment = Appointments.query.get(id)

  if not appointment:
    return jsonify({ "message" : "Cita no encontrada!"}), 404

  data = request.get_json()

  formattedDateTime = datetime.strptime(data['date'], '%Y-%m-%d').date()

  appointment.user_id = data['user_id']
  appointment.date = formattedDateTime
  appointment.patient_id = data['patient_id']
  appointment.status = data['status']
  appointment.doctor_id = data['doctor_id']
  appointment.state = data['state']

  db.session.commit()
  return jsonify({ "message" : "Cita Actualizada con Exito!", "appointment": appointment.serialize()})

@app.route('/appointment/<int:id>', methods=['DELETE'])
def delete_appointment(id):
  appointment = Appointments.query.get(id)
  if not appointment:
    return jsonify({ "message" : "Cita no encontrada!"}), 404

  db.session.delete(appointment)
  db.session.commit()
  return jsonify({ "message" : "Cita Eliminada con Exito!"})

  # Guardar Historial medico

@app.route('/medicalhistory', methods=['POST'])
def create_medicalhistory():
  data = request.get_json()
  medicalhistory = MedicalHistory(user_id=data['user_id'],
  age=data['age'],
  child_number=data['child_number'],
  weight=data['weight'],
  height=data ['height'],
  bloodtype=data['bloodType'],
  disease=data['disease'], description_disease= data ['description_disease'] ,
  medicines=data['medicines'],
  description_medicines= data['description_medicines'],
  sugery=data['sugery'],
  description_sugery= data['description_sugery'],
  allergies=data['allergies'],
  description_allergies= data['description_allergies'])

  db.session.add(medicalhistory)
  db.session.commit()

  return jsonify({ "message" : "Historial Medico Creado con Exito!", "medicalhistory": medicalhistory.serialize()}), 201


#obtener un historial medico
@app.route('/medicalhistory/<int:id>', methods=['GET'])
def get_medicalhistory(id):
  medicalhistory = MedicalHistory.query.get(id)

  if not medicalhistory:
    return jsonify({ "message" : "Historial Medico no encontrado!"}, 404)

  return jsonify(medicalhistory.serialize())


#obtener usuario en Select





