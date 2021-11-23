BUILD_NUMBER ?= dev
BASE_PATH = $(shell pwd)
IMAGE_NAME ?= webui
IMAGE_VERSION ?= v0.1.0
IMAGE_TAG ?= ${IMAGE_VERSION}-${BUILD_NUMBER}
REPO_URL ?= 588200329560.dkr.ecr.eu-west-1.amazonaws.com
WEBUI_BRANCH ?= develop

default: all ;
all: clean prep build clean ;
kaniko_all: clean prep kaniko_build clean ;

prep:
	git clone -b ${WEBUI_BRANCH} https://github.com/reclada/webui.git

clean:
	rm -rf webui

kaniko_build:
	/kaniko/executor -f ${BASE_PATH}/Dockerfile \
	-c ${BASE_PATH}/ --insecure --skip-tls-verify --cache=false \
	--destination ${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG} \
	--destination ${REPO_URL}/${IMAGE_NAME}:latest

build:
	docker build -f Dockerfile -t ${IMAGE_NAME}:${IMAGE_TAG} .
	docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}
	docker push ${REPO_URL}/${IMAGE_NAME}:${IMAGE_TAG}
