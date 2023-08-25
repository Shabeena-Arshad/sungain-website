#!/bin/zsh
echo "Start ...."

# Variables
current_path=$PWD
docker_realty-hub_admin=/Volumes/Projects/docker/realty-hub-docker/realty-hub-admin/src

 # Build production enviroment
 yarn build

 # copy build files to docker application
  cp -r dist/* $docker_realty-hub_admin

# Github
# Add command
git -C $docker_realty-hub_admin add .

#commit command
git -C $docker_realty-hub_admin commit -m "Publish update vue prod"

#Push code to repo
 git -C $docker_realty-hub_admin push

echo "Done"