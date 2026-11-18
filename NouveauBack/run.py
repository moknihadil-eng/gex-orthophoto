import os
import sys

# Ensure the project root is on the Python path
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run()
