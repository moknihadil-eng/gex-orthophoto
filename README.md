# Gex-Orthophoto

A full-stack web application built with React and Flask for user authentication and protected account access.

The original Flask backend included **12 REST endpoints**. This public repository exposes **5 endpoints**, described below.

## Features

- Account registration, sign-in, profile access, and sign-out, with a protected API route.
- A local API test console at `/test-api` in development mode.

## Setup and testing

The [setup guide](NouveauBack/README.md) explains how to configure the database, start the servers, and run the tests.

- Flask authentication tests use an in-memory SQLite database.
- React tests cover access control.

Orthophoto processing remains to be implemented.
