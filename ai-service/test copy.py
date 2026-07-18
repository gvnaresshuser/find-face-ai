from insightface.app import FaceAnalysis

print("Loading model...")

app = FaceAnalysis(name="buffalo_l")

app.prepare(ctx_id=0)

print("Model Loaded Successfully")