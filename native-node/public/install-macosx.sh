#!/bin/zsh

#!/bin/bash

# Default values for optional arguments
ENFORCE=false
SCOPE="user"
APP_PATH=""

# Function to display usage
usage() {
    echo "Usage: $0 [--enforce true] [--scope user|all] [--path path]"
    exit 1
}

# Parse long options
while [[ $# -gt 0 ]]; do
  case "$1" in
    --enforce)
      ENFORCE="$2"
      shift 2
      ;;
    --path)
      APP_PATH="$2"
      shift 2
      ;;
    --scope)
      SCOPE="$2"
      if [[ "$2" == "user" || "$2" == "all" ]]; then
          SCOPE="$2"
      else
          echo "Invalid value for -scope. It must be either 'user' or 'all'."
          usage
      fi
      shift 2
      ;;  
    *)
      echo "Invalid option: $1"
      usage
      exit 1
      ;;
  esac
done

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

# Function to install NVM and Node.js version $REQUIRED_NODE_VERSION
install_nvm_and_node() {
  echo "Installing NVM (Node Version Manager)..."
  xcode-select --install
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

  # Load NVM
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

  echo "Installing Node.js version $REQUIRED_NODE_VERSION..."
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
GOOGLE_MESSAGING_DIR="~/Library/Application Support/Google/Chrome/NativeMessagingHosts"
GOOGLE_MESSAGING_FILE="net.sobrier.maxime.classification_node.json"
URL_FINISH="https://chromewebstore.google.com/detail/website-classification/beakpmhehilljkbehdgcnfnhbopfgmpn"
JSON_FILE_URL="https://raw.githubusercontent.com/MaximeSobrier/congress-app-2024/main/native-node/public/net.sobrier.maxime.classification_node.json"
POLICY_MAC_URL="https://raw.githubusercontent.com/MaximeSobrier/congress-app-2024/main/native-node/public/com.google.Chrome.plist"

# Check if Node.js version 20 or higher is installed
if ! check_node_version "$REQUIRED_NODE_VERSION"; then
  # If not, ask for user permission to install NVM and Node.js version 20
  ask_permission "Node.js version $REQUIRED_NODE_VERSION or higher is not installed. Do you want to install NVM and Node.js version $REQUIRED_NODE_VERSION?"
  install_nvm_and_node
fi

# Prompt the user for the path to host the native app
if [ -z "$APP_PATH" ]; then
  APP_PATH=$(prompt_for_path)
fi

if [ ! -d "$APP_PATH" ]; then
  mkdir -p "$APP_PATH"
  echo "Directory $APP_PATH created."
fi

# Download the native app
ZIP_FILE_URL="https://icategorize.com/extension-chrome/web-classification.zip"
ZIP_FILE="web-classification.zip"

curl $ZIP_FILE_URL -o $ZIP_FILE

# Unzip the native app to the specified directory
unzip -q -o $ZIP_FILE -d $APP_PATH

# Download the native messaging host manifest file
curl $JSON_FILE_URL -o $GOOGLE_MESSAGING_FILE 

# Replace a placeholder string in the GOOGLE_MESSAGING_FILE with the new APP_PATH
sed -i '' "s|PLACEHOLDER_PATH|$APP_PATH|g" "$GOOGLE_MESSAGING_FILE"


# Copy the native messaging host manifest file to the required directory
if ! check_write_permissions "$GOOGLE_MESSAGING_DIR" ; then
  ask_permission "Allow sudo access to write required file to $GOOGLE_MESSAGING_DIR."
  sudo mkdir -p "$GOOGLE_MESSAGING_DIR"
  sudo cp -f "$GOOGLE_MESSAGING_FILE" "$GOOGLE_MESSAGING_DIR"
else
  mkdir -p "$GOOGLE_MESSAGING_DIR"
  cp -f "$GOOGLE_MESSAGING_FILE" "$GOOGLE_MESSAGING_DIR"
fi

# Set policies if enforcing
if [ "$ENFORCE" = true ]; then
  if [ ! -f "policy.json" ]; then
    echo "Please create a file policy.json in the current directory. Go to https://icategorize.com/extension/policy.html to generate the list of categories to block."
  fi

  POLICY_DIR="/etc/opt/chrome/policies/managed"

  # Manual policy for now
  echo "To create a policy for Mac, use the plist file at $POLICY_MAC_URL -o $POLICY_DIR/com.google.Chrome.plist"
fi


# Launch Chrome with information to finish the installation
open "$URL_FINISH"

echo "Native messaging host installed successfully."
echo "Follow the instruction at $URL_FINISH to finish to install the Google Chrome extension."


# Cleanup temporary files
rm -f $ZIP_FILE
