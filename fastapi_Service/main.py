from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pickle

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailText(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Spam Detection Server is Running"}

@app.post("/predictEmail")
async def predict(data: EmailText):
    try:
        vectorized_input = vectorizer.transform([data.text])
        
        prediction = model.predict(vectorized_input)[0]

        if prediction == 1:
            label = "Spam"
        else:
            label = "Not Spam"
            
        return JSONResponse(content={"prediction": label})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
