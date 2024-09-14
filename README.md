# Google Chrome extension to categorize web pages

This repository contains the source code of the Google Chrome extension submitted to the Congressional App Challenge 2024. 

This app classifies web pages based on their content in real-time across 345 categories

This work is based on the research published by Maxime Sobrier (paper to come). More information about the research is available at [https://icategorize.com/](https://icategorize.com/). The 2 innovations include:

* small fastText models that achieve 94% precision on English content. This extension use the 35MB model.
* a new library (to be published on gitHub and npm soon) that identifies languages accurately with a low memory footprint

The app is made of 2 components

* a Google Chrome extensson to set the policy and block pages
* a native app (for WIndows, Linux and Mac OSX) that runs the small machine-learning model to classify web pages.

The extension and the native app communicates through Google Chrome [Native messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging)


## Automated installation

### Linux automated installation


### Windows automated installation

Open the **Windows PowerShell** and run this command:

  Invoke-WebRequest -Uri https://icategorize.com/install-windows.ps1 -OutFile install-windows.ps1; \.install-windows.ps1

### Mac OSX automated installation


## Manual Installation


## Future work



## Privacy

This app runs completely locally. No data is sent to any external server. No analytics are sent externally