#!/bin/bash

read -p "CodinGame puzzle name ? " name
read -p "CodinGame puzzle uri ? " uri
name="codingame-$name"

cp -R _templates/ts-minimal "challenges/$name"

cd "challenges/$name"
sed -i "s/ts-minimal/${name}/g" package.json
sed -i "s/codingame-temperatures/${name}/g" README.md
sed -i "s=https://www.codingame.com/training/easy/temperatures=${uri}=g" README.md

yarn -W
