BUILD_NUMBER ?= dev
BASE_PATH = $(shell pwd)
IMAGE_NAME ?= postgrest
IMAGE_VERSION ?= v0.1.0
IMAGE_TAG ?= ${IMAGE_VERSION}-${BUILD_NUMBER}
REPO_URL ?= 588200329560.dkr.ecr.eu-west-1.amazonaws.com

default: build ;

kaniko_build:
	/kaniko/executor -f ${BASE_PATH}/Dockerfile \
	-c ${BASE_PATH}/ --insecure --skip-tls-verify --cache=false \
	--destination ${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG} \
	--destination ${REPO_URL}/${IMAGE_NAME}:latest

build:
	docker build -f Dockerfile -t ${IMAGE_NAME}:${IMAGE_TAG} .
	docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}
	docker push ${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}
