#!/bin/bash

# Function to check if Node.js version is the specified version or higher
check_node_version() {
  local required_version="$1"

  # Get the installed Node.js version
  NODE_VERSION=$(node -v 2>/dev/null)

  # Check if Node.js is installed
  if [ $? -ne 0 ]; then
    echo "Node.js is not installed."
    return 1
  fi

  # Extract the major version number
  NODE_MAJOR_VERSION=$(echo $NODE_VERSION | grep -oP 'v\K[0-9]+')

  # Check if the major version is the required version or higher
  if [ "$NODE_MAJOR_VERSION" -ge "$required_version" ]; then
    echo "Node.js version $required_version or higher is installed."
    return 0
  else
    echo "Node.js version $required_version or higher is not installed. Installed version is $NODE_VERSION."
    return 1
  fi
}

# Function to install NVM and Node.js version 20
install_nvm_and_node() {
  echo "Installing NVM (Node Version Manager)..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

  # Load NVM
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

  echo "Installing Node.js version 20..."
  nvm install $REQUIRED_NODE_VERSION
  nvm use $REQUIRED_NODE_VERSION
}

# Function to ask for user permission with a custom message
ask_permission() {
  local message="$1"
  read -p "$message (y/n): " choice
  case "$choice" in 
    y|Y ) return 0;;
    n|N ) echo "Installation aborted."; exit 1;;
    * ) echo "Invalid input."; ask_permission "$message";;
  esac
}

# Function to check if the user has write permissions to a directory
check_write_permissions() {
  local dir="$1"
  if [ -w "$dir" ]; then
    echo "You have write permissions for $dir."
    return 0
  else
    echo "You do not have write permissions for $dir."
    return 1
  fi
}

# Function to prompt the user for the path to create a file
prompt_for_path() {
  local default_path="$HOME/classification"
  read -p "Enter the path to host the native app (default: $default_path): " user_path
  if [ -z "$user_path" ]; then
    user_path="$default_path"
  fi
  echo "$user_path"
}

# Required Node.js version
REQUIRED_NODE_VERSION=16
GOOGLE_MESSAGING_DIR="/etc/opt/chrome/native-messaging-hosts/"
GOOGLE_MESSAGING_FILE="net.sobrier.maxime.classification_node.json"
URL_FINISH="https://icategorize/com/extension/v1/install.html"

# Check if Node.js version 20 or higher is installed
if ! check_node_version "$REQUIRED_NODE_VERSION"; then
  # If not, ask for user permission to install NVM and Node.js version 20
  ask_permission "Node.js version $REQUIRED_NODE_VERSION or higher is not installed. Do you want to install NVM and Node.js version $REQUIRED_NODE_VERSION?"
  install_nvm_and_node
fi

# Prompt the user for the path to host the native app
APP_PATH=$(prompt_for_path)
if [ ! -d "$APP_PATH" ]; then
  mkdir -p "$APP_PATH"
  echo "Directory $APP_PATH created."
fi

# Replace a placeholder string in the GOOGLE_MESSAGING_FILE with the new APP_PATH
sed -i "s|PLACEHOLDER_PATH|$APP_PATH|g" "$GOOGLE_MESSAGING_FILE"


# Copy the native messaging host manifest file to the required directory
if ! check_write_permissions "$GOOGLE_MESSAGING_DIR" ; then
  ask_permission "Allow sudo access to write required file to $GOOGLE_MESSAGING_DIR."
  sudo cp -f $GOOGLE_MESSAGING_FILE $GOOGLE_MESSAGING_DIR
else
  cp -f $GOOGLE_MESSAGING_FILE $GOOGLE_MESSAGING_DIR
fi

# Launch Chrome with information to finish the installation
google-chrome "$URL_FINISH" &

echo "Native messaging host installed successfully."
echo "Follow the instruction at $URL_FINISH to finish to install the Google Chrome extension."