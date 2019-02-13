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
- JAWS + IE11 - Windows
- JAWS + Chrome - Windows

## Usage

```javascript
import routeManager from 'screen-reader-route-manager';

// To be called before the URL is changed.
routeManager.beforeRouteChange();

// To be called after the URL is changed
routeManager.afterRouteChange();
```

`afterRouteChange` won't execute anything if `beforeRouteChange` hasn't been called. This is to prevent unwanted focus management forcing the user to the top of the page.

[An example codesandbox](https://codesandbox.io/s/xl677vzrlw)

## Demo

[See it in action](https://xl677vzrlw.codesandbox.io/)
