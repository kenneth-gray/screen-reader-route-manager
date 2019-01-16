let topOfPage = null;
let routeChangeStarted = false;

const routeManager = {
  afterRouteChange,
  beforeRouteChange,
};

export default routeManager;

function beforeRouteChange() {
  // This section is needed for VoiceOver on iOS.
  // Otherwise focusing a non standard element doesn't work.
  // This is needed for NVDA to prevent "current page" from being
  // read out.
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }

  if (topOfPage === null) {
    initialise();
  }

  routeChangeStarted = true;
}

function initialise() {
  topOfPage = document.createElement('span');
  topOfPage.setAttribute('class', 'visually-hidden');
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
    body.prepend(topOfPage);
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
    // - TalkBack will acutally focus the topOfPage element.
    setTimeout(() => {
      topOfPage.focus();
      routeChangeStarted = false;
    }, 50);
  }
}
