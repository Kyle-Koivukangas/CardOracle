import os
from PIL import Image

os.chdir(f"{os.getcwd()}/src/assets/cards")
path = os.getcwd()
files = os.listdir(path)
print(path)
print(files)

replacement_jpg = Image.open("Oraclecover.jpg")

# [os.rename(f, f.title() for f in files]

files = [x for x in files if ".Py" not in x]
print(files)

for file in files:
    print(file)
    replacement_jpg.save(file)

