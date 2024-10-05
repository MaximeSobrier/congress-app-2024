# Google Chrome extension to categorize web pages

This repository contains the source code of the Google Chrome extension submitted to the Congressional App Challenge 2024. 

This app classifies web pages based on their content in real-time across 345 categories

This work is based on the research published by Maxime Sobrier (paper to published at the IEEE Conference on Future Machine Learning and Data Science, Sydney, 2024). More information about the research is available at [https://icategorize.com/](https://icategorize.com/). The 2 innovations include:

* small fastText models that achieve 94% precision on English content. This extension use the 35MB model.
* a new library (to be published on gitHub and npm soon) that identifies languages accurately with a low memory footprint

The app is made of 2 components

* a [Google Chrome extension](https://chromewebstore.google.com/detail/website-classification/beakpmhehilljkbehdgcnfnhbopfgmpn) to set the policy and block pages
* a native app (for Windows, Linux and Mac OSX) that runs the small machine-learning model to classify web pages.

The extension and the native app communicates through Google Chrome [Native messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging).


## Automated installation

### Linux automated installation

In the console, run the following command:

    curl https://raw.githubusercontent.com/MaximeSobrier/congress-app-2024/main/native-node/public/install-linux.sh | bash

### Windows automated installation

Open the **Windows PowerShell** and run this command:

    Set-ExecutionPolicy -Scope CurrentUser Unrestricted; Invoke-WebRequest -Uri https://raw.githubusercontent.com/MaximeSobrier/congress-app-2024/main/native-node/public/install-windows.ps1 -OutFile install-windows.ps1; .\install-windows.ps1 -enforce=$false -scope=user

Then, open the **Command Prompt** to install nodejs:

    nvm install 16; nvm use 16

To enforce a policy (a list of categories to block), and to ensure all users on the computer have the extension installed an the policy enforced, do the following:
1. Generate a `policy.json` file using [https://icategorize.com/extension/policy.html](https://icategorize.com/extension/policy.html)
2. Run the script `install-windows.ps1` with these arguments:


    install-windows.ps1 -enforce=$true -scope=computer
 
### Mac OSX automated installation


## Manual Installation


## Future work



## Privacy

This app runs completely locally. No data is sent to any external server. No analytics are sent externally.