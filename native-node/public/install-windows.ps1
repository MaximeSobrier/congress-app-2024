# Function to check if Node.js version is the specified version or higher
function Check-NodeVersion {
    param (
        [int]$RequiredVersion
    )

    try {
        # Get the installed Node.js version
        $nodeVersion = node -v 2>$null

        # Check if Node.js is installed
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Node.js is not installed."
            return $false
        }

        # Extract the major version number
        $nodeMajorVersion = [int]($nodeVersion -replace 'v(\d+).*', '$1')

        # Check if the major version is the required version or higher
        if ($nodeMajorVersion -ge $RequiredVersion) {
            Write-Host "Node.js version $RequiredVersion or higher is installed."
            return $true
        } else {
            Write-Host "Node.js version $RequiredVersion or higher is not installed. Installed version is $nodeVersion."
            return $false
        }
    } catch {
        Write-Host "An error occurred while checking the Node.js version."
        return $false
    }
}

# Function to install NVM and Node.js version 20
function Install-NvmAndNode {
    param (
        [int]$NodeVersion
    )

    Write-Host "Installing NVM (Node Version Manager)..."
    Invoke-WebRequest -Uri https://github.com/coreybutler/nvm-windows/releases/latest/download/nvm-setup.exe -OutFile nvm-setup.exe
    Start-Process -FilePath nvm-setup.exe -Wait

    Write-Host "Installing Node.js version $NodeVersion..."
    nvm install $NodeVersion
    nvm use $NodeVersion
}

# Function to ask for user permission with a custom message
function Ask-Permission {
    param (
        [string]$Message
    )
    $choice = Read-Host "$Message (y/n)"
    switch ($choice) {
        'y' { return $true }
        'n' { Write-Host "Installation aborted."; exit 1 }
        default { Write-Host "Invalid input."; Ask-Permission $Message }
    }
}

# Function to check if the user has write permissions to a directory
function Check-WritePermissions {
    param (
        [string]$Dir
    )
    if (Test-Path -Path $Dir -PathType Container) {
        Write-Host "You have write permissions for $Dir."
        return $true
    } else {
        Write-Host "You do not have write permissions for $Dir."
        return $false
    }
}

# Function to prompt the user for the path to create a file
function Prompt-ForPath {
    $defaultPath = [System.Environment]::GetFolderPath('UserProfile')
    $defaultPath = Join-Path -Path $defaultPath -ChildPath "website-classification"
    $userPath = Read-Host "Enter the path to host the native app (default: $defaultPath)"
    if ([string]::IsNullOrEmpty($userPath)) {
        $userPath = $defaultPath
    }
    return $userPath
}

# Required Node.js version
$REQUIRED_NODE_VERSION = 16
$GOOGLE_MESSAGING_DIR = "C:\ProgramData\Google\Chrome\NativeMessagingHosts\"
$GOOGLE_MESSAGING_FILE = "net.sobrier.maxime.classification_node.json"
$URL_FINISH = "https://icategorize/com/extension/v1/install.html"
$regFileUrl = "https://github.com/MaximeSobrier/congress-app-2024/raw/main/native-node/public/native-messaging.reg"
$jsonFileUrl = "https://github.com/MaximeSobrier/congress-app-2024/raw/main/native-node/public/net.sobrier.maxime.classification_node.json.win"
$regFilePath = "native-messaging.reg"


# Download required files
Download-File -Url $regFileUrl -DestinationPath $regFilePath
Download-File -Url $jsonFileUrl -DestinationPath $GOOGLE_MESSAGING_FILE


# Check if Node.js version 20 or higher is installed
if (-not (Check-NodeVersion -RequiredVersion $REQUIRED_NODE_VERSION)) {
    # If not, ask for user permission to install NVM and Node.js version 20
    if (Ask-Permission -Message "Node.js version $REQUIRED_NODE_VERSION or higher is not installed. Do you want to install NVM and Node.js version $REQUIRED_NODE_VERSION?") {
        Install-NvmAndNode -NodeVersion $REQUIRED_NODE_VERSION
    }
}

# Prompt the user for the path to host the native app
$APP_PATH = Prompt-ForPath
if (-not (Test-Path -Path $APP_PATH)) {
    New-Item -ItemType Directory -Path $APP_PATH
    Write-Host "Directory $APP_PATH created."
}

# Replace a placeholder string in the GOOGLE_MESSAGING_FILE with the new APP_PATH
(Get-Content $GOOGLE_MESSAGING_FILE) -replace 'PLACEHOLDER_PATH', $APP_PATH | Set-Content $GOOGLE_MESSAGING_FILE

# Copy the native messaging host manifest file to the required directory
if (-not (Check-WritePermissions -Dir $GOOGLE_MESSAGING_DIR)) {
    if (Ask-Permission -Message "Allow admin access to write required file to $GOOGLE_MESSAGING_DIR.") {
        Copy-Item -Path $GOOGLE_MESSAGING_FILE -Destination $GOOGLE_MESSAGING_DIR -Force -ErrorAction Stop
    }
} else {
    Copy-Item -Path $GOOGLE_MESSAGING_FILE -Destination $GOOGLE_MESSAGING_DIR -Force
}

# Run native-message.reg to update the Windows registry
Start-Process "reg.exe" -ArgumentList "import native-message.reg" -Wait -NoNewWindow


# Launch Chrome with information to finish the installation
Start-Process "chrome.exe" $URL_FINISH

Write-Host "Native messaging host installed successfully."
Write-Host "Follow the instruction at $URL_FINISH to finish to install the Google Chrome extension."