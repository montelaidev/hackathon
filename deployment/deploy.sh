#!/bin/bash
echo "Enter Version: "
read VERSION

echo "Enter ENV File Path: "
read ENV

sudo docker kill $(docker ps -q)
sudo docker rm $(docker ps -a -q)
sudo docker rmi $(docker images -q)
sudo docker ps -al


echo "run sudo docker build . -t hackathon-ws-chain1:$VERSION -f Dockerfile.Subscription"
sudo docker build . -t hackathon-ws-chain1:$VERSION -f Dockerfile.Subscription
sudo docker run -itd --rm --env-file $ENV hackathon-ws:$VERSION

echo "run sudo docker build . -t hackathon-ws-chain5:$VERSION -f Dockerfile.Subscription"
sudo docker build . -t hackathon-ws-chain5:$VERSION -f Dockerfile.Subscription
sudo docker run -itd --rm --env-file $ENV hackathon-ws-chain5:$VERSION

echo "run sudo docker build . -t hackathon:$VERSION -f Dockerfile.Subscription"
sudo docker build . -t hackathon:$VERSION -f Dockerfile
sudo docker run -itd --rm --env-file $ENV -p 80:9000 hackathon:$VERSION
