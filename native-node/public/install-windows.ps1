param (
    [string]$APP_PATH = "",
    [bool]$enforce = $false,
    [string]$scope = "user"
)

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

    # Refresh the environment variables
    & "$env:ProgramFiles\nodejs\nodevars.bat"

    Write-Host "Installing Node.js version $NodeVersion..."
    try {
        nvm install $NodeVersion
        nvm use $NodeVersion
    } catch {
        Write-Host "Failed to install Node.js version $NodeVersion."
        throw
    }
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

# Function to download a file from a URL
function Download-File {
    param (
        [string]$Url,
        [string]$DestinationPath
    )

    try {
        Write-Host "Downloading $Url to $DestinationPath ..."
        Invoke-WebRequest -Uri $Url -OutFile $DestinationPath
        Write-Host "Downloaded $Url to $DestinationPath"
    } catch {
        Write-Host "Failed to download $Url"
        throw
    }
}

# Function to unzip a file to a specified destination
function Unzip-File {
    param (
        [string]$ZipFilePath,
        [string]$DestinationPath
    )

    try {
        Write-Host "Unzipping $ZipFilePath to $DestinationPath ..."
        Expand-Archive -Path $ZipFilePath -DestinationPath $DestinationPath -Force
        Write-Host "Unzipped $ZipFilePath to $DestinationPath"
    } catch {
        Write-Host "Failed to unzip $ZipFilePath"
        throw
    }
}

# Function to set folder permissions to prevent deletion or modification
function Set-FolderPermissions {
    param (
        [string]$FolderPath
    )

    try {
        $acl = Get-Acl -Path $FolderPath
        $currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name

        # Remove write and delete permissions for the current user
        $denyRule = New-Object System.Security.AccessControl.FileSystemAccessRule($currentUser, "Write,Delete", "Deny")
        $acl.AddAccessRule($denyRule)

        Set-Acl -Path $FolderPath -AclObject $acl
        Write-Host "Set permissions to prevent deletion or modification of $FolderPath"
    } catch {
        Write-Host "Failed to set permissions for $FolderPath"
        throw
    }
}

# Required Node.js version
$REQUIRED_NODE_VERSION = 16
# $GOOGLE_MESSAGING_DIR = "C:\ProgramData\Google\Chrome\NativeMessagingHosts\"
$GOOGLE_MESSAGING_FILE = "net.sobrier.maxime.classification_node.json"
$URL_FINISH = "https://chromewebstore.google.com/detail/website-classification/beakpmhehilljkbehdgcnfnhbopfgmpn"
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
if ([string]::IsNullOrEmpty($APP_PATH)) {
    $APP_PATH = Prompt-ForPath
}

if (-not (Test-Path -Path $APP_PATH)) {
    New-Item -ItemType Directory -Path $APP_PATH
    Write-Host "Directory $APP_PATH created."
}

$APP_PATH_ESCAPE = $APP_PATH -replace '\\', '\\'
# $APP_PATH_ESCAPE = $APP_PATH

# Replace a placeholder string in the GOOGLE_MESSAGING_FILE with the new APP_PATH
(Get-Content $GOOGLE_MESSAGING_FILE) -replace 'PLACEHOLDER_PATH', $APP_PATH_ESCAPE| Set-Content $GOOGLE_MESSAGING_FILE

# Replace a placeholder string in the regFilePath with the new APP_PATH
(Get-Content $regFilePath) -replace 'PLACEHOLDER_PATH', $APP_PATH_ESCAPE | Set-Content $regFilePath

# Register the native app for all users if the scope is not "user"
if ($scope -ne "user") {
    (Get-Content $regFilePath) -replace 'HKEY_CURRENT_USER', "HKEY_LOCAL_MACHINE" | Set-Content $regFilePath
}

# Set Google Chrome policy to enforce the user of the extension
if($enforce) {
    if ($scope -eq "user") {
        New-ItemProperty –Path "HKCU\SOFTWARE\Policies\Google\Chrome\ExtensionInstallForcelist " -Name "Website Classification" -Value beakpmhehilljkbehdgcnfnhbopfgmpn
    } else {
        New-ItemProperty –Path "HKLM\SOFTWARE\Policies\Google\Chrome\ExtensionInstallForcelist " -Name "Website Classification" -Value beakpmhehilljkbehdgcnfnhbopfgmpn
    }
}


# Create the required directory if it does not exist
# if (-not (Test-Path -Path $GOOGLE_MESSAGING_DIR)) {
#     New-Item -ItemType Directory -Path $GOOGLE_MESSAGING_DIR -Force -ErrorAction Stop
#     Write-Host "Directory $GOOGLE_MESSAGING_DIR created."
# }

# Copy the native messaging host manifest file to the required directory
# if (-not (Check-WritePermissions -Dir $GOOGLE_MESSAGING_DIR)) {
#     if (Ask-Permission -Message "Allow admin access to write required file to $GOOGLE_MESSAGING_DIR.") {
#         Copy-Item -Path $GOOGLE_MESSAGING_FILE -Destination $GOOGLE_MESSAGING_DIR -Force -ErrorAction Stop
#     }
# } else {
#     Copy-Item -Path $GOOGLE_MESSAGING_FILE -Destination $GOOGLE_MESSAGING_DIR -Force
# }

# Define the URL and paths
$zipFileUrl = "https://icategorize.com/extension-chrome/web-classification.zip"
$zipFilePath = "web-classification.zip"

# Download the ZIP file
Download-File -Url $zipFileUrl -DestinationPath $zipFilePath

# Unzip the file inside $APP_PATH
Unzip-File -ZipFilePath $zipFilePath -DestinationPath $APP_PATH

# Copy the native messaging host manifest file to the required directory
Copy-Item -Path $GOOGLE_MESSAGING_FILE -Destination $APP_PATH -Force


# Run native-message.reg to update the Windows registry
Start-Process "reg.exe" -ArgumentList "import $regFilePath" -Wait -NoNewWindow

# Delete temporary files
Remove-Item -Path $zipFilePath -Force
Remove-Item -Path "native-messaging.reg" -Force
Remove-Item -Path "net.sobrier.maxime.classification_node.json" -Force
Remove-Item -Path "nvm-setup.exe" -Force

# poloicy.json must exist if enforce is true
if ($enforce -and -not (Test-Path -Path "policy.json")) {
    Write-Host "Please create a file policy.json in the current directory. Go to https://icategorize.com/extension/policy.html to generate the list of categorise to block."
    exit 0
}


# Set folder permissions to prevent deletion or modification
if ($enforce) {
    Copy-Item -Path "policy.json" -Destination $APP_PATH -Force
    Set-FolderPermissions -FolderPath $APP_PATH
}


# Launch Chrome with information to finish the installation
Start-Process "chrome.exe" $URL_FINISH

Write-Host "Native messaging host installed successfully."
Write-Host "Follow the instruction at $URL_FINISH to finish to install the Google Chrome extension."