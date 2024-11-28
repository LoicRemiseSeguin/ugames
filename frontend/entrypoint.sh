#!/bin/sh
sed -i "s|DEFAULT_URL|${API_URL}|" /app/src/api/fetchWrapper.ts
exec "$@"