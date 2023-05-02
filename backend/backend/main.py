from typing import Union
import os

from fastapi import Depends, FastAPI, Header, HTTPException, Response, File, UploadFile
from fastapi.responses import FileResponse
from dotenv import load_dotenv

from auth import get_user_email
from extract.extract import SenateMinutes
from search.search import SearchEngine
from database.text_database import TextDatabase

app = FastAPI()
db = TextDatabase()
search_engine = SearchEngine()


def extract_file(filename, num):
    print(filename)
    minute = SenateMinutes(filename, senate_number=num)
    minute.extract()
    db.new_minutes(minute, num)


def verify_auth_token(Authorization: str = Header()):
    email = get_user_email(Authorization)
    if email is None:
        raise HTTPException(
            status_code=401, detail="We are not able to authenticate you."
        )
    return email


@app.get("/")
def read_root():
    extract_file('./data/assets/minutes_51.pdf', 51)
    return {"Hello": "World"}


@app.get("/auth")
async def auth(email: str = Depends(verify_auth_token)):
    """
    Test Endpoint to validate user identity.
    """
    return {"email": email}


@app.post("/upload_minutes/{num}/")
async def upload_minutes(file: UploadFile, num: int):
    """
    Upload Documents, To be Protected by Auth and Accessible to Admin Users only
    This Route is to upload Senate Meeting Documents only.
    """
    file_cnt = file.file.read()
    try:
        with open(f"./data/assets/minutes_{num}.pdf", 'wb') as f:
            f.write(file_cnt)
    except Exception:
        return {"msg": "Saving the File Failed"}
    finally:
        file.file.close()
        extract_file(file.filename, num)

    return {file.filename}


@app.post("/upload_handbook")
async def upload_handbook(file: UploadFile):
    """
    Upload Documents, To be Protected by Auth and Accessible to Admin Users only
    This Route is to upload Senate Meeting Documents only.
    """
    file_cnt = file.file.read()
    try:
        with open(f"./data/assets/handbook.pdf", 'wb') as f:
            f.write(file_cnt)
    except Exception:
        return {"msg": "Saving the File Failed"}
    finally:
        file.file.close()
        extract_file(file.filename)

    return {file.filename}


@app.post("/upload_agenda/{num}/")
async def upload_agenda(file: UploadFile, num: int):
    """
    Upload Documents, To be Protected by Auth and Accessible to Admin Users only
    This Route is to upload Senate Meeting Documents only.
    """
    file_cnt = file.file.read()
    try:
        with open(f"./data/assets/agenda_{num}.pdf", 'wb') as f:
            f.write(file_cnt)
    except Exception:
        return {"msg": "Saving the File Failed"}
    finally:
        file.file.close()
        extract_file(file.filename)

    return {file.filename}


@app.get('/handbook')
async def view_handbook():
    """
    View the Academic Handbook
    """
    current_dir = os.getcwd()
    return FileResponse(f'{current_dir}/data/assets/handbook.pdf')


@app.get('/minutes/pdf/{minutes_number}')
async def view_minutes_pdf(minutes_number: int):
    """
    Retrieve the PDF of minutes from the database.
    """
    try:
        headers = {'Content-Disposition': 'inline', 'filename': "out.pdf"}
        current_dir = os.getcwd()
        return FileResponse(f'{current_dir}/data/assets/minutes_{minutes_number}.pdf')
    except Exception as err:
        return {"error": err}


@app.get('/search')
async def search_query(query: str):
    # TODO: Change later to walk based
    available_docs = []
    for i in range(52):
        minute_obj = db.retrieve_minutes(i)
        if minute_obj is not None:
            available_docs.append(minute_obj)
            print('Doc Available')

    print("retrieved docs, sending to search engine for querying")

    print(available_docs)
    search_results = search_engine.search(query, available_docs)

    return search_results
