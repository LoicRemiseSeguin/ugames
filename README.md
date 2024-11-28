# Launching the application
```
    export BOARDGAME_DB_PASSWORD=<changeme>
    docker-compose up -d --build
```

# add fake data to the application
```
    ./data.sh
```

# Stopping the application
```
    docker-compose down -v
```
