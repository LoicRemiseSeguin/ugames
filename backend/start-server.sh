#!/bin/bash

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <mysql_user> <mysql_password> [--reset-db]"
    exit 1
fi

export MYSQL_USERNAME=$1
export MYSQL_PASSWORD=$2
RESET_DB=false

# Vérification si l'option --reset-db est passée
if [ "$3" == "--reset-db" ]; then
    RESET_DB=true
fi

echo "Vérification du service MySQL..."
if ! systemctl is-active --quiet mysql; then
    echo "Le service MySQL n'est pas en cours d'exécution."
    exit 1
fi

if [ "$RESET_DB" = true ]; then
    echo "Vidage de la base de données 'boardgame_database'..."
    mysql -u "$MYSQL_USERNAME" -p"$MYSQL_PASSWORD" -e "DROP DATABASE IF EXISTS boardgame_database; CREATE DATABASE boardgame_database;"
    if [ $? -ne 0 ]; then
        echo "Erreur lors du vidage de la base de données."
        exit 1
    fi
else
    echo "Création de la base de données si elle n'existe pas..."
    mysql -u "$MYSQL_USERNAME" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS boardgame_database;"
    if [ $? -ne 0 ]; then
        echo "Erreur lors de la création de la base de données."
        exit 1
    fi
fi

echo "Installation des dépendances..."
npm install express sequelize mysql2 body-parser

echo "Lancement du serveur..."
node app.js
