#!/bin/bash

mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -D "$MYSQL_DATABASE" -e "DELETE FROM TrailUserData;"
