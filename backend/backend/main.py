from typing import Union

from fastapi import Depends, FastAPI, Header, HTTPException, Response
from dotenv import load_dotenv

from auth import get_user_email
app = FastAPI()

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

