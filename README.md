# Launch backend
```
    cd backend
    docker-compose up -d --build
```

# Add data to db
```
    cd backend
    ./data.sh
```

# Shutdown backend
```
    cd backend
    docker-compose down -v
```

# Launch frontend
```
    cd frontend
    npm install
    npm run dev
```
