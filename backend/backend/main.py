from typing import Union

from fastapi import Depends, FastAPI, Header, HTTPException, Response
from fastapi import FastAPI
from fastapi import Depends, FastAPI, Header, HTTPException, Response, File, UploadFile
from dotenv import load_dotenv

from auth import get_user_email
from extract import SenateMinutes
app = FastAPI()

def extract_file(filename):
    print(filename)
    extracted_cnt = SenateMinutes(filename, senate_number=49)

def verify_auth_token(Authorization: str = Header()):
    email = get_user_email(Authorization)
    if email is None:
        raise HTTPException(
            status_code=401, detail="We are not able to authenticate you."
        )
    return email


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/auth")
async def auth(email: str = Depends(verify_auth_token)):
    """
    Test Endpoint to validate user identity.
    """
    return {"email": email}

@app.post("/uploadfile")
async def upload_file(file: UploadFile):
    """
    Upload Documents, To be Protected by Auth and Accessible to Admin Users only
    """
    print(file)
    file_cnt = file.file.read()
    try:
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"msg":"Saving the File Failed"}
    finally:
        file.file.close()
        extract_file(file.filename)

    return {file.filename}

