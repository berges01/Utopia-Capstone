#!/bin/bash

mysql -u "$MYSQL_USER" --password="$MYSQL_PASSWORD" -D "$MYSQL_DATABASE" -e "DELETE FROM TrailUserData;"
