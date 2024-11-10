#!/usr/bin/env bash

source ./.venv/bin/activate
cd ./server/
flask --app app.py run --debug
