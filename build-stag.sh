#!/bin/zsh
echo "Start ...."

# Variables
current_path=$PWD
docker_realty-hub_dev=/Volumes/Projects/docker/realty-hub-docker/realty-hub-admin-dev/src/dist

 # Build staging enviroment
 yarn build --mode staging

 # copy build files to docker application
  cp -r dist/* $docker_realty-hub_dev

# Github
# Add command
git -C $docker_realty-hub_dev add .

#commit command
git -C $docker_realty-hub_dev commit -m "Publish update vue dev"

#pull code first
git pull

#Push code to repo
 git -C $docker_realty-hub_dev push

echo "Done"