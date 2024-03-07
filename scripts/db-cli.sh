#!/bin/bash
# Description: This script is used to run the database CLI.
source .env.development.local
psql $POSTGRES_URL