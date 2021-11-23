#!/bin/bash

__DIR="$( realpath "$( dirname "${BASH_SOURCE[0]}" )" )"
BASE_DIR="${BASE_DIR:-${__DIR}}"
sudo -E /bin/bash "${BASE_DIR}/main.sh"
