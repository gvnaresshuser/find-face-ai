from flask import Flask, request, jsonify
from flask_cors import CORS

import cv2
import numpy as np

from insightface.app import FaceAnalysis

app = Flask(__name__)

CORS(app)

print("Loading InsightFace model...")

face_app = FaceAnalysis(name="buffalo_l")

face_app.prepare(ctx_id=0)

print("AI Service Ready")


@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "MomentMatch AI Service Running"
    })


@app.route("/generateEmbedding", methods=["POST"])
def generate_embedding():

    if "photo" not in request.files:

        return jsonify({
            "success": False,
            "message": "No photo uploaded"
        }), 400

    file = request.files.get("photo")

    if file is None:
        return jsonify({
            "success": False,
            "message": "Photo not found"
        }), 400

    image_bytes = np.frombuffer(file.read(), np.uint8)

    image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

    faces = face_app.get(image)

    if len(faces) == 0:

        return jsonify({
            "success": False,
            "message": "No face detected"
        })

    detected_faces = []

    for index, face in enumerate(faces):
        print("Embedding length:", len(face.embedding))
        print("Embedding norm:", np.linalg.norm(face.embedding))
        x1, y1, x2, y2 = face.bbox.astype(int)

        detected_faces.append({
            "faceIndex": index,
            "embedding": face.embedding.tolist(),
            "bbox": {
                "x": int(x1),
                "y": int(y1),
                "width": int(x2 - x1),
                "height": int(y2 - y1)
            },
            "confidence": float(face.det_score)
        })

    return jsonify({
        "success": True,
        "facesDetected": len(detected_faces),
        "faces": detected_faces
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )