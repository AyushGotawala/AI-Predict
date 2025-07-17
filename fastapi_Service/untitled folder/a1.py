import pickle
print("hii")

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

print(type(model))
print(dir(model))
