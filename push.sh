#!/bin/bash

# Script to build and push Docker image to Docker Hub
# Usage: ./push-docker.sh [tag]

set -e

# Configuration
DOCKER_USERNAME="${DOCKER_USERNAME:-}"
IMAGE_NAME="anxiety-aid-tools"
TAG="${1:-latest}"
FULL_IMAGE_NAME="${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Docker Hub Push Script${NC}"
echo "================================"

# Check if Docker username is set
if [ -z "$DOCKER_USERNAME" ]; then
    echo -e "${YELLOW}DOCKER_USERNAME not set. Please enter your Docker Hub username:${NC}"
    read -r DOCKER_USERNAME
    FULL_IMAGE_NAME="${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"
fi

echo -e "${GREEN}Image:${NC} $FULL_IMAGE_NAME"
echo ""

# Check if user is logged in to Docker Hub
echo -e "${GREEN}Checking Docker login status...${NC}"
if ! docker info | grep -q "Username"; then
    echo -e "${YELLOW}Not logged in to Docker Hub. Please log in:${NC}"
    docker login
fi

# Build the Docker image
echo -e "${GREEN}Building Docker image...${NC}"
docker build -t "$FULL_IMAGE_NAME" .

# Also tag as latest if a specific tag was provided
if [ "$TAG" != "latest" ]; then
    echo -e "${GREEN}Tagging as latest...${NC}"
    docker tag "$FULL_IMAGE_NAME" "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
fi

# Push to Docker Hub
echo -e "${GREEN}Pushing to Docker Hub...${NC}"
docker push "$FULL_IMAGE_NAME"

if [ "$TAG" != "latest" ]; then
    docker push "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
fi

echo ""
echo -e "${GREEN}✓ Successfully pushed image to Docker Hub!${NC}"
echo -e "Image: ${YELLOW}$FULL_IMAGE_NAME${NC}"
if [ "$TAG" != "latest" ]; then
    echo -e "Also tagged as: ${YELLOW}${DOCKER_USERNAME}/${IMAGE_NAME}:latest${NC}"
fi
