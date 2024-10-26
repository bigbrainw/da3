from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Define the upload directory
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api', methods=['POST'])
def receive_file():
    try:
        # Check if the request has data
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        # Get the file from the request
        file = request.files['file']
        
        # Save the file to the uploads directory
        file_path = os.path.join(UPLOAD_FOLDER, 'received.obj')
        file.save(file_path)
        
        return jsonify({"message": "File received successfully"}), 200
    except Exception as e:
        print(f"Error receiving file: {e}")
        return jsonify({"error": "Failed to process the file"}), 500

if __name__ == '__main__':
    app.run(debug=True)
