# PageSpeed Insights Report

**Generated for:** https://partyshope.com/

**Generated at:** 2/18/2026, 3:18:08 PM

## Summary

| Categories | Mobile | Desktop |
|------------|--------|----------|
| Performance | 71/100 | 91/100 |
| Accessibility | 89/100 | 83/100 |
| Best Practices | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |

## Mobile Categories

### Performance: 71/100

#### Core Web Vitals

- **Largest Contentful Paint (LCP):** 5.5 s
- **Interaction to Next Paint (INP):** N/A
- **Cumulative Layout Shift (CLS):** 0
- **First Contentful Paint (FCP):** 2.8 s

#### Failed Audits

**First Contentful Paint**

First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).

*Value:* 2.8 s


**Largest Contentful Paint**

Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)

*Value:* 5.5 s


**Total Blocking Time**

Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).

*Value:* 150 ms


**Speed Index**

Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).

*Value:* 4.6 s


**Use efficient cache lifetimes**

A long cache lifetime can speed up repeat visits to your page. [Learn more about caching](https://developer.chrome.com/docs/performance/insights/cache).

*Value:* Est savings of 122 KiB


**Font display**

Consider setting [font-display](https://developer.chrome.com/docs/performance/insights/font-display) to swap or optional to ensure text is consistently visible. swap can be further optimized to mitigate layout shifts with [font metric overrides](https://developer.chrome.com/blog/font-fallbacks).

*Value:* Est savings of 270 ms


**Forced reflow**

A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about [forced reflows](https://developer.chrome.com/docs/performance/insights/forced-reflow) and possible mitigations.


**Improve image delivery**

Reducing the download time of images can improve the perceived load time of the page and LCP. [Learn more about optimizing image size](https://developer.chrome.com/docs/performance/insights/image-delivery)

*Value:* Est savings of 42 KiB


**LCP request discovery**

[Optimize LCP](https://developer.chrome.com/docs/performance/insights/lcp-discovery) by making the LCP image discoverable from the HTML immediately, and avoiding lazy-loading


**Legacy JavaScript**

Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile [Baseline](https://web.dev/articles/baseline-and-polyfills) features, unless you know you must support older browsers. [Learn why most sites can deploy ES6+ code without transpiling](https://developer.chrome.com/docs/performance/insights/legacy-javascript)

*Value:* Est savings of 26 KiB


**Network dependency tree**

[Avoid chaining critical requests](https://developer.chrome.com/docs/performance/insights/network-dependency-tree) by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.


**Render blocking requests**

Requests are blocking the page's initial render, which may delay LCP. [Deferring or inlining](https://developer.chrome.com/docs/performance/insights/render-blocking) can move these network requests out of the critical path.

*Value:* Est savings of 1,200 ms


**Time to Interactive**

Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).

*Value:* 5.6 s


**Max Potential First Input Delay**

The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).

*Value:* 160 ms


**Reduce unused CSS**

Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).

*Value:* Est savings of 66 KiB


**Reduce unused JavaScript**

Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).

*Value:* Est savings of 90 KiB


#### Passed Audits

31 audits passed:

- Cumulative Layout Shift
- Layout shift culprits
- Document request latency
- Optimize DOM size
- Duplicated JavaScript
- INP breakdown
- LCP breakdown
- 3rd parties
- Optimize viewport for mobile
- Minify CSS
- Minify JavaScript
- Avoids enormous network payloads
- User Timing marks and measures
- JavaScript execution time
- Minimizes main-thread work
- Avoid long main-thread tasks
- Avoid non-composited animations
- Image elements have explicit `width` and `height`
- Network Requests
- Network Round Trip Times
- Server Backend Latencies
- Tasks
- Diagnostics
- Metrics
- Screenshot Thumbnails
- Final Screenshot
- Script Treemap Data
- Resources Summary
- Avoid multiple page redirects
- Initial server response time was short
- Avoid large layout shifts

### Accessibility: 89/100

#### Failed Audits

**Background and foreground colors do not have a sufficient contrast ratio.**

Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast).


**Heading elements are not in a sequentially-descending order**

Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order).


**Links do not have a discernible name**

Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn how to make links accessible](https://dequeuniversity.com/rules/axe/4.11/link-name).


**Document does not have a main landmark.**

One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main).


#### Passed Audits

69 audits passed:

- `[accesskey]` values are unique
- `[aria-*]` attributes match their roles
- `button`, `link`, and `menuitem` elements have accessible names
- ARIA attributes are used as specified for the element's role
- Deprecated ARIA roles were not used
- Elements with `role="dialog"` or `role="alertdialog"` have accessible names.
- `[aria-hidden="true"]` is not present on the document `<body>`
- `[aria-hidden="true"]` elements do not contain focusable descendents
- ARIA input fields have accessible names
- ARIA `meter` elements have accessible names
- ARIA `progressbar` elements have accessible names
- Elements use only permitted ARIA attributes
- `[role]`s have all required `[aria-*]` attributes
- Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.
- `[role]`s are contained by their required parent element
- `[role]` values are valid
- Elements with the `role=text` attribute do not have focusable descendents.
- ARIA toggle fields have accessible names
- ARIA `tooltip` elements have accessible names
- ARIA `treeitem` elements have accessible names
- `[aria-*]` attributes have valid values
- `[aria-*]` attributes are valid and not misspelled
- Buttons have an accessible name
- The page contains a heading, skip link, or landmark region
- `<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.
- Definition list items are wrapped in `<dl>` elements
- Document has a `<title>` element
- ARIA IDs are unique
- No form fields have multiple labels
- `<frame>` or `<iframe>` elements have a title
- `<html>` element has a `[lang]` attribute
- `<html>` element has a valid value for its `[lang]` attribute
- `<html>` element has an `[xml:lang]` attribute with the same base language as the `[lang]` attribute.
- Image elements have `[alt]` attributes
- Input buttons have discernible text.
- `<input type="image">` elements have `[alt]` text
- Form elements have associated labels
- Links are distinguishable without relying on color.
- Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).
- List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements
- The document does not use `<meta http-equiv="refresh">`
- `[user-scalable="no"]` is not used in the `<meta name="viewport">` element and the `[maximum-scale]` attribute is not less than 5.
- `<object>` elements have alternate text
- Select elements have associated label elements.
- Skip links are focusable.
- No element has a `[tabindex]` value greater than 0
- Touch targets have sufficient size and spacing.
- Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.
- `<th>` elements and elements with `[role="columnheader"/"rowheader"]` have data cells they describe.
- `[lang]` attributes have a valid value
- `<video>` elements contain a `<track>` element with `[kind="captions"]`
- Interactive controls are keyboard focusable
- Interactive elements indicate their purpose and state
- The page has a logical tab order
- Visual order on the page follows DOM order
- User focus is not accidentally trapped in a region
- The user's focus is directed to new content added to the page
- HTML5 landmark elements are used to improve navigation
- Offscreen content is hidden from assistive technology
- Custom controls have associated labels
- Custom controls have ARIA roles
- Tables have different content in the summary attribute and `<caption>`.
- All heading elements contain content.
- Uses ARIA roles only on compatible elements
- Image elements do not have `[alt]` attributes that are redundant text.
- Identical links have the same purpose.
- Elements with visible text labels have matching accessible names.
- Tables use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.
- `<td>` elements in a large `<table>` have one or more table headers.

### Best Practices: 100/100

#### Failed Audits

**Missing source maps for large first-party JavaScript**

Source maps translate minified code to the original source code. This helps developers debug in production. In addition, Lighthouse is able to provide further insights. Consider deploying source maps to take advantage of these benefits. [Learn more about source maps](https://developer.chrome.com/docs/devtools/javascript/source-maps/).


#### Passed Audits

19 audits passed:

- Uses HTTPS
- Redirects HTTP traffic to HTTPS
- Avoids requesting the geolocation permission on page load
- Avoids requesting the notification permission on page load
- Ensure CSP is effective against XSS attacks
- Use a strong HSTS policy
- Ensure proper origin isolation with COOP
- Mitigate clickjacking with XFO or CSP
- Mitigate DOM-based XSS with Trusted Types
- Allows users to paste into input fields
- Displays images with correct aspect ratio
- Serves images with appropriate resolution
- Page has the HTML doctype
- Properly defines charset
- Detected JavaScript libraries
- Avoids deprecated APIs
- Avoids third-party cookies
- No browser errors logged to the console
- No issues in the `Issues` panel in Chrome Devtools

### SEO: 100/100

#### Passed Audits

11 audits passed:

- Page isn’t blocked from indexing
- Document has a `<title>` element
- Document has a meta description
- Page has successful HTTP status code
- Links have descriptive text
- Links are crawlable
- robots.txt is valid
- Image elements have `[alt]` attributes
- Document has a valid `hreflang`
- Document has a valid `rel=canonical`
- Structured data is valid


## Desktop Categories

### Performance: 91/100

#### Core Web Vitals

- **Largest Contentful Paint (LCP):** 1.4 s
- **Interaction to Next Paint (INP):** N/A
- **Cumulative Layout Shift (CLS):** 0
- **First Contentful Paint (FCP):** 0.7 s

#### Failed Audits

**First Contentful Paint**

First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).

*Value:* 0.7 s


**Largest Contentful Paint**

Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)

*Value:* 1.4 s


**Total Blocking Time**

Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).

*Value:* 100 ms


**Speed Index**

Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).

*Value:* 1.9 s


**Use efficient cache lifetimes**

A long cache lifetime can speed up repeat visits to your page. [Learn more about caching](https://developer.chrome.com/docs/performance/insights/cache).

*Value:* Est savings of 122 KiB


**Font display**

Consider setting [font-display](https://developer.chrome.com/docs/performance/insights/font-display) to swap or optional to ensure text is consistently visible. swap can be further optimized to mitigate layout shifts with [font metric overrides](https://developer.chrome.com/blog/font-fallbacks).

*Value:* Est savings of 410 ms


**Forced reflow**

A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about [forced reflows](https://developer.chrome.com/docs/performance/insights/forced-reflow) and possible mitigations.


**Improve image delivery**

Reducing the download time of images can improve the perceived load time of the page and LCP. [Learn more about optimizing image size](https://developer.chrome.com/docs/performance/insights/image-delivery)

*Value:* Est savings of 97 KiB


**LCP breakdown**

Each [subpart has specific improvement strategies](https://developer.chrome.com/docs/performance/insights/lcp-breakdown). Ideally, most of the LCP time should be spent on loading the resources, not within delays.


**LCP request discovery**

[Optimize LCP](https://developer.chrome.com/docs/performance/insights/lcp-discovery) by making the LCP image discoverable from the HTML immediately, and avoiding lazy-loading


**Legacy JavaScript**

Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile [Baseline](https://web.dev/articles/baseline-and-polyfills) features, unless you know you must support older browsers. [Learn why most sites can deploy ES6+ code without transpiling](https://developer.chrome.com/docs/performance/insights/legacy-javascript)

*Value:* Est savings of 26 KiB


**Network dependency tree**

[Avoid chaining critical requests](https://developer.chrome.com/docs/performance/insights/network-dependency-tree) by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.


**Render blocking requests**

Requests are blocking the page's initial render, which may delay LCP. [Deferring or inlining](https://developer.chrome.com/docs/performance/insights/render-blocking) can move these network requests out of the critical path.

*Value:* Est savings of 240 ms


**Time to Interactive**

Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).

*Value:* 1.4 s


**Max Potential First Input Delay**

The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).

*Value:* 100 ms


**Reduce unused CSS**

Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).

*Value:* Est savings of 66 KiB


**Reduce unused JavaScript**

Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).

*Value:* Est savings of 150 KiB


#### Passed Audits

30 audits passed:

- Cumulative Layout Shift
- Layout shift culprits
- Document request latency
- Optimize DOM size
- Duplicated JavaScript
- INP breakdown
- 3rd parties
- Optimize viewport for mobile
- Minify CSS
- Minify JavaScript
- Avoids enormous network payloads
- User Timing marks and measures
- JavaScript execution time
- Minimizes main-thread work
- Avoid long main-thread tasks
- Avoid non-composited animations
- Image elements have explicit `width` and `height`
- Network Requests
- Network Round Trip Times
- Server Backend Latencies
- Tasks
- Diagnostics
- Metrics
- Screenshot Thumbnails
- Final Screenshot
- Script Treemap Data
- Resources Summary
- Avoid multiple page redirects
- Initial server response time was short
- Avoid large layout shifts

### Accessibility: 83/100

#### Failed Audits

**Buttons do not have an accessible name**

When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers. [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name).


**Background and foreground colors do not have a sufficient contrast ratio.**

Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast).


**Heading elements are not in a sequentially-descending order**

Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order).


**Links do not have a discernible name**

Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn how to make links accessible](https://dequeuniversity.com/rules/axe/4.11/link-name).


**Document does not have a main landmark.**

One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main).


#### Passed Audits

68 audits passed:

- `[accesskey]` values are unique
- `[aria-*]` attributes match their roles
- `button`, `link`, and `menuitem` elements have accessible names
- ARIA attributes are used as specified for the element's role
- Deprecated ARIA roles were not used
- Elements with `role="dialog"` or `role="alertdialog"` have accessible names.
- `[aria-hidden="true"]` is not present on the document `<body>`
- `[aria-hidden="true"]` elements do not contain focusable descendents
- ARIA input fields have accessible names
- ARIA `meter` elements have accessible names
- ARIA `progressbar` elements have accessible names
- Elements use only permitted ARIA attributes
- `[role]`s have all required `[aria-*]` attributes
- Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.
- `[role]`s are contained by their required parent element
- `[role]` values are valid
- Elements with the `role=text` attribute do not have focusable descendents.
- ARIA toggle fields have accessible names
- ARIA `tooltip` elements have accessible names
- ARIA `treeitem` elements have accessible names
- `[aria-*]` attributes have valid values
- `[aria-*]` attributes are valid and not misspelled
- The page contains a heading, skip link, or landmark region
- `<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.
- Definition list items are wrapped in `<dl>` elements
- Document has a `<title>` element
- ARIA IDs are unique
- No form fields have multiple labels
- `<frame>` or `<iframe>` elements have a title
- `<html>` element has a `[lang]` attribute
- `<html>` element has a valid value for its `[lang]` attribute
- `<html>` element has an `[xml:lang]` attribute with the same base language as the `[lang]` attribute.
- Image elements have `[alt]` attributes
- Input buttons have discernible text.
- `<input type="image">` elements have `[alt]` text
- Form elements have associated labels
- Links are distinguishable without relying on color.
- Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).
- List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements
- The document does not use `<meta http-equiv="refresh">`
- `[user-scalable="no"]` is not used in the `<meta name="viewport">` element and the `[maximum-scale]` attribute is not less than 5.
- `<object>` elements have alternate text
- Select elements have associated label elements.
- Skip links are focusable.
- No element has a `[tabindex]` value greater than 0
- Touch targets have sufficient size and spacing.
- Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.
- `<th>` elements and elements with `[role="columnheader"/"rowheader"]` have data cells they describe.
- `[lang]` attributes have a valid value
- `<video>` elements contain a `<track>` element with `[kind="captions"]`
- Interactive controls are keyboard focusable
- Interactive elements indicate their purpose and state
- The page has a logical tab order
- Visual order on the page follows DOM order
- User focus is not accidentally trapped in a region
- The user's focus is directed to new content added to the page
- HTML5 landmark elements are used to improve navigation
- Offscreen content is hidden from assistive technology
- Custom controls have associated labels
- Custom controls have ARIA roles
- Tables have different content in the summary attribute and `<caption>`.
- All heading elements contain content.
- Uses ARIA roles only on compatible elements
- Image elements do not have `[alt]` attributes that are redundant text.
- Identical links have the same purpose.
- Elements with visible text labels have matching accessible names.
- Tables use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.
- `<td>` elements in a large `<table>` have one or more table headers.

### Best Practices: 100/100

#### Failed Audits

**Missing source maps for large first-party JavaScript**

Source maps translate minified code to the original source code. This helps developers debug in production. In addition, Lighthouse is able to provide further insights. Consider deploying source maps to take advantage of these benefits. [Learn more about source maps](https://developer.chrome.com/docs/devtools/javascript/source-maps/).


#### Passed Audits

19 audits passed:

- Uses HTTPS
- Redirects HTTP traffic to HTTPS
- Avoids requesting the geolocation permission on page load
- Avoids requesting the notification permission on page load
- Ensure CSP is effective against XSS attacks
- Use a strong HSTS policy
- Ensure proper origin isolation with COOP
- Mitigate clickjacking with XFO or CSP
- Mitigate DOM-based XSS with Trusted Types
- Allows users to paste into input fields
- Displays images with correct aspect ratio
- Serves images with appropriate resolution
- Page has the HTML doctype
- Properly defines charset
- Detected JavaScript libraries
- Avoids deprecated APIs
- Avoids third-party cookies
- No browser errors logged to the console
- No issues in the `Issues` panel in Chrome Devtools

### SEO: 100/100

#### Passed Audits

11 audits passed:

- Page isn’t blocked from indexing
- Document has a `<title>` element
- Document has a meta description
- Page has successful HTTP status code
- Links have descriptive text
- Links are crawlable
- robots.txt is valid
- Image elements have `[alt]` attributes
- Document has a valid `hreflang`
- Document has a valid `rel=canonical`
- Structured data is valid


## Full Report

A complete report with detailed tables is available online at:

https://pagespeed.web.dev/report?url=https%3A%2F%2Fpartyshope.com%2F
