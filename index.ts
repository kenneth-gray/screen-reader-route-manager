let topOfPage = null;
let routeChangeStarted = false;

const routeManager = {
  afterRouteChange,
  beforeRouteChange,
};

export default routeManager;

function beforeRouteChange() {
  // Blurring on JAWS + IE11 leads to unexpected elements being announced
  // @ts-ignore
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if (document.activeElement && !isIE11) {
    // This section is needed for VoiceOver on iOS.
    // Otherwise focusing a non standard element doesn't work.
    // This is needed for NVDA to prevent "current page" from being
    // read out.
    (document.activeElement as HTMLElement).blur();
  }

  if (topOfPage === null) {
    initialise();
  }

  routeChangeStarted = true;
}

const visuallyHiddenStyles =
  'border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; white-space: nowrap;';

function initialise() {
  topOfPage = document.createElement('span');
  topOfPage.setAttribute('style', visuallyHiddenStyles);
  // Allow JS to focus element.
  topOfPage.setAttribute('tabindex', '-1');

  // Hide/remove content on leaving the area (via tab or assistive technology keys).
  // This won't trigger for VoiceOver on iOS. Using a timeout to clear the
  // content had adverse affects on VoiceOver on iOS.
  const removeAndHideContent = () => {
    topOfPage.textContent = '';
    topOfPage.setAttribute('aria-hidden', 'true');
  };
  topOfPage.addEventListener('blur', removeAndHideContent);
  topOfPage.addEventListener('focusout', removeAndHideContent);
  topOfPage.addEventListener('keydown', removeAndHideContent);

  const body = document.querySelector('body');
  if (body) {
    // Add to top of page.
    body.insertBefore(topOfPage, body.firstChild);
  }

  return;
}

function afterRouteChange() {
  // Only update and focus the top when required.
  if (routeChangeStarted) {
    topOfPage.removeAttribute('aria-hidden');
    topOfPage.textContent = document.title;
    // This timeout gives screen readers time to register
    // that the link is not longer focused allowing the following:
    // - NVDA won't read out "current page" if aria-current="page"
    //   attribute is being used on the link.
    // - TalkBack will actually focus the topOfPage element.
    setTimeout(() => {
      topOfPage.focus();
      routeChangeStarted = false;
    }, 50);
  }
}
