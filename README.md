# Screen Reader Route Manager

## Installation

```
npm install screen-reader-route-manager
```

## Reason for library

One of the issues screen reader users face when they access Single Page Apps (SPAs) is selecting links will often not read out the page they navigate to. This library aims to fix that issue by reading out the `document.title` of the new page and moving focus to the top. This means that `document.title` must be also set correctly before `routeManager.afterRouteChange()` can be called.

## Screen readers tested

- NVDA + Firefox - Windows
- VoiceOver + Safari - iOS
- VoiceOver + Safari - macOS
- VoiceOver + Chrome - macOS
- Talkback + Chrome - Android

## Example

[An example codesandbox](https://codesandbox.io/s/xl677vzrlw)

## Demo

[See it in action](https://xl677vzrlw.codesandbox.io/)
