from insightface.app import FaceAnalysis
import cv2

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)

image = cv2.imread("uploads/naresh.jpg")

faces = app.get(image)

print("Faces Detected:", len(faces))

if len(faces) > 0:
    embedding = faces[0].embedding

    print(type(embedding))

    print(len(embedding))

    print(embedding[:10])