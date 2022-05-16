#!/bin/bash
echo "Enter Version: "
read VERSION



sudo docker kill $(docker ps -q)
sudo docker rm $(docker ps -a -q)
sudo docker rmi $(docker images -q)
sudo docker ps -al


echo "run sudo docker build . -t hackathon-ws-chain1:$VERSION -f Dockerfile.Subscription"
sudo docker build . -t hackathon-ws-chain1:$VERSION -f Dockerfile.Subscription
sudo docker run -itd --rm --env-file ../.env-ws-1 hackathon-ws:$VERSION

echo "run sudo docker build . -t hackathon-ws-chain5:$VERSION -f Dockerfile.Subscription"
sudo docker build . -t hackathon-ws-chain5:$VERSION -f Dockerfile.Subscription
sudo docker run -itd --rm --env-file ../.env-ws-5 hackathon-ws-chain5:$VERSION

echo "run sudo docker build . -t hackathon:$VERSION -f Dockerfile.Subscription"
sudo docker build . -t hackathon:$VERSION -f Dockerfile
sudo docker run -itd --rm --env-file ../.env -p 80:9000 hackathon:$VERSION
