from typing import Union

from fastapi import Depends, FastAPI, Header, HTTPException, Response, File, UploadFile
from fastapi.responses import FileResponse
from dotenv import load_dotenv

from auth import get_user_email
from extract.extract import SenateMinutes

from database.text_database import TextDatabase

app = FastAPI()
db = TextDatabase()


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

@app.post("/upload_minutes/{num}")
async def upload_minutes(file: UploadFile, num: int):
    """
    Upload Documents, To be Protected by Auth and Accessible to Admin Users only
    This Route is to upload Senate Meeting Documents only.
    """
    file_cnt = file.file.read()
    try:
        with open(f"./data/assets/minutes_{num}.pdf", 'wb') as f:
            f.write(contents)
    except Exception:
        return {"msg":"Saving the File Failed"}
    finally:
        file.file.close()
        extract_file(file.filename)

    return {file.filename}

@app.get('/handbook')
async def view_handbook():
    """
    View the Academic Handbook
    """
    return {"Hello":"world"}

@app.get('/minutes/pdf/{minute_number}')
async def view_minutes_pdf(minute_number: int, response_class=FileResponse):
    """
    Retrieve the PDF of minutes from the database.
    """
    try:
        return f'./assets/minutes_{minutes_number}.pdf'
    except Exception as err:
        return {"error":err}
    return 

@app.get('/search')
async def search_query():

    pass
