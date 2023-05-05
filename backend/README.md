## Senate-Search Backend

This folder contains the backend of Senate Search implemented in Python 3.

### Installation and Usage Instructions

### Prerequisites:

You must have a Python version >=3.8 to run the backend.

We use [Poetry](https://python-poetry.org/) as a virtual environment and dependency management system.
Please install poetry for using the backend. Installation instructions can be found on [Poetry's website.](https://python-poetry.org/)

It is recommended to have atleast 4GB of system space on your machine, since we load a pretrained model and NVIDIA libraries for the search functionality.

It is also recommended to try this on systems with a NVIDIA GPU, for faster search functionality.

### Usage:

#### Installing Dependencies and activate the environment:

In this folder, open a terminal and run:

```
poetry install
```

This will install all required dependencies in a virtual environment, such as FastAPI among others.

Now, to enter the virtual environment, open a terminal and run:

```
poetry shell
```

#### Starting the backend:

After installing the dependencies and activating the virtual environment:

```
cd backend
uvicorn main:app --reload
```

This will start the backend web server on port `8000`. You can now use `http://localhost:8000` to interact with the backend.

### Development Code Checks.

We use `black` and `isort` to maintain code formatting.  
Please run `black` before committing on all staged files.

We also use `flake8` for code linting.
