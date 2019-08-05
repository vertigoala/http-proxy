#!/bin/bash
#
# Linha de comando "npm" usando container
# A variável NPM_MIRROR pode indicar um npm registry privado
#
export NPM_REG=""
[ -z "$NPM_MIRROR" ] && export NPM_REG="--registry $NPM_MIRROR"
docker run --rm -ti \
  -p 3000:3000 \
  -v $(pwd):/build:delegated \
  -w /build \
  -e TERM=xterm \
  -e PORT=3000 \
  node:lts-alpine npm "$@" "$NPM_REG"
