from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

app = Flask(__name__)

# Define the MySQL database connection
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:erik1999@localhost/HistoricalTrailData"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define the table structure
class ChirpstackData(Base):
    __tablename__ = "chirpstack_data"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(255))
    payload = Column(String(255))
    timestamp = Column(DateTime, default=datetime.utcnow)

# Create the table if not exists
Base.metadata.create_all(bind=engine)

# Endpoint to receive POST requests from Chirpstack
@app.route('/chirpstack/data', methods=['POST'])
def receive_chirpstack_data():
    data = request.get_json()

    # Assuming Chirpstack sends device_id and payload
    device_id = data.get('device_id')
    payload = data.get('payload')

    # Insert data into the database
    db = SessionLocal()
    db_data = ChirpstackData(device_id=device_id, payload=payload)
    db.add(db_data)
    db.commit()
    db.close()

    return jsonify({"message": "Data received and inserted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
