#!/bin/bash

BASE_URL="https://f8cos8wsgcc080o8kk08o4og.attssystem.dev"

curl -X POST "$BASE_URL/api/users" \
-H "Content-Type: application/json" \
-d '{
    "username":"root",
    "password_hash":"root",
    "email":"root@root.fr",
    "first_name":"root",
    "last_name":"root",
    "registration_date":"04/03/2022",
    "city":"root",
    "is_admin":true
}'

for i in {2..10}; do
  curl -X POST "$BASE_URL/api/users" \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"username_$i\",
    \"password_hash\": \"password_$i\",
    \"email\": \"email_$i@email.com\",
    \"first_name\": \"first_name_$i\",
    \"last_name\": \"last_name_$i\",
    \"city\": \"city_$i\"
  }"
done

for i in {1..10}; do
  curl -X POST "$BASE_URL/api/games" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"game_$i\",
    \"description\": \"This is the description for Game $i\",
    \"category\": \"category_$i\",
    \"average_playtime\": \"$i\",
    \"min_players\": \"$i\",
    \"max_players\": \"$i\"
  }"
done

for i in {1..10}; do
  curl -X POST "$BASE_URL/api/events" \
  -H "Content-Type: application/json" \
  -d "{
    \"creator_id\": \"$i\",
    \"game_id\": \"$i\",
    \"event_name\": \"event_name_$i\",
    \"event_description\": \"event_description_$i\",
    \"event_date\": \"11/11/2022\",
    \"is_public\": \"true\",
    \"city\": \"city_$i\"
  }"
done
