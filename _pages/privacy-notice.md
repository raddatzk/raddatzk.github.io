---
layout: page
title: Privacy Notice
permalink: /privacy-notice
---

## Responsible body

Responsible for the data processing on this website is:

> Kevin Raddatz  
> Rosenweg 12  
> 40723 Hilden  
> E-Mail: kevin@raddatz.me

## Hosting and automatic data collection

This website is hosted via GitHub Pages. Log files are automatically created in which information such as IP address,
access time, browser type and other system-relevant data is recorded. This data is used exclusively for the technical
provision of the website and is not used for any other purpose. Please note that GitHub Pages processes this data as a
third-party provider and may also store it in third countries (e.g. the USA). You can find more information on this in
GitHub's privacy policy.

## Integration of external content

{% for cookie in site.cookieconsent.cookies %}

### {{ cookie.title }}

{{ cookie.content }}

{{ cookie.description }}. The integration only takes place after the visitor has expressly
consented via the cookie banner. Only then will data be transmitted to {{ cookie.vendor }}. Further details on data
protection at {{ cookie.title }} can be found in their [privacy policy]({{ cookie.privacyPolicy }}).

The decision about embedding {{ cookie.title }} into this website is stored in the local storage variable 
`{{ cookie.name }}`. 

{% endfor %}

### Revocation of consent

You can revoke the consent to integrate external content by reopening the
<a href="#" onclick="ccb.showBanner()">cookie dialog</a>. 

This does not delete already created cookies by the external content provider.

## No own data collection

No personal data is collected by me personally on this website - there is no active collection of data via contact forms
of data via contact forms, newsletters or other input options.

## Data security

Appropriate technical and organizational measures are taken to protect the data generated in the context of hosting and
the integration of external content in the best possible way.

* The connection between your browser and the website is encrypted via HTTPS.
* Regular updates and security precautions ensure that the website is always up to date.
* The GitHub account, which is responsible for hosting at GitHub Pages, is additionally secured by a passkey
  secured by a passkey.

## Rights of the user

Since no personal data is collected and processed via this website, there is generally no direct possibility to
possibility to request information, correction, deletion or restriction of processing. Should there nevertheless be a
concerns, I refer to the data protection offers of the third-party providers (GitHub and YouTube). For general inquiries
about data protection, you are welcome to contact the above e-mail address.

## Changes to this privacy policy

I reserve the right to amend this privacy policy as necessary in order to always adapt it to the current legal situation
and to technical developments.