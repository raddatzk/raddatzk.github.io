var ccb =
    {
        version: '0.0.2',
        jqueryattempts: 0,
        setupcomplete: false,
        show_banner: true,
        consent_approved: false,
        style: "dark",
        cookies: {

ccb_youtube: {
    title: "YouTube",
        description: "YouTube videos are integrated on this website",
        action: "Embed YouTube videos in this website",
        disabled: false,
    allowed: false,
    loaded: false
},

ccb_komoot: {
    title: "Komoot",
        description: "Komoot tracks are integrated on this website",
        action: "Embed Komoot Tracks in this website",
        disabled: false,
    allowed: false,
    loaded: false
},

},

strings: {
    notificationHead: "This web site uses cookies",
        notificationText: "We use cookies for providing our services on this page. While some of them are necessary, others help us to improve our online offering and operate it economically. Accept the optional cookies or reject them by clicking on the \"Accept Only Selected\" button. These settings can be revoked at any time. For more information please refer to our <a href=\"/privacy-notice\">privacy notice</a>.",
        btnAcceptAll: "Accept All",
        btnAcceptSelected: "Accept Only Selected",
        btnMore: "More",
},

onFirstLoad: function () {
    if (!ccb.setupcomplete) {
        if (!(window.jQuery)) {
            ccb.jqueryattempts++;
            if (ccb.jqueryattempts >= 5) {
                return;
            }
            setTimeout(ccb.onFirstLoad, 200);
            return;
        }
        ccb.setupcomplete = true;
    }
    ccb.checkApproval();
},
initialise: function (obj) {
    if (obj.show_banner !== undefined) {
        ccb.show_banner = obj.show_banner;
    }
    // check if jquery has been loaded
    ccb.onFirstLoad();
},
checkApproval: function () {
    ccb.readCookies();
    if (!ccb.consent_approved) {
        if (ccb.show_banner) {
            ccb.showBanner();
        }
    } else {
        ccb.executeScripts();
    }
},
readCookies: function () {
    for (let key of Object.keys(ccb.cookies)) {
        let value = localStorage.getItem(key);
        ccb.cookies[key].allowed = value === "true";
        ccb.cookies[key].loaded = true;
    }
    ccb.consent_approved = true;
    jQuery.each(ccb.cookies, function (key, value) {
        if (!ccb.cookies[key].loaded) {
            ccb.consent_approved = false;
        }
    });
},
setCookie: function (name, value) {
    localStorage.setItem(name, value);
},
showBanner: function () {
    jQuery('#ccb-notification').remove();
    if (determineComputedTheme() === "dark") {
        background_color = "bg-dark";
        text_color = "text-white";
    } else {
        background_color = "bg-light";
        text_color = "text-black";
    }
    let data = `
          <div class="modal fade show" id="cookieDialog" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content ${background_color} ${text_color}">
                <div class="modal-header">
                  <h4><div id="ccb-notification-head"><i class="fas fa-cookie-bite"></i>&nbsp;</div></h4>
                </div>
                <div class="modal-body">
                  <p><div id="ccb-notification-text"></div></p>
                  
                    <div class="d-flex flex-row mb-1">
                      <div class="pr-1">
                        <label class="switch">
                          <input type="checkbox" id="ccb-toggle-ccb_youtube">
                          <span class="slider round"></span>
                        </label>
                      </div>    
                      <div class="pl-2 pr-5">YouTube</div>
                      <div class="pl-2 pr-5">Embed YouTube videos in this website</div>
                    </div>
                  
                    <div class="d-flex flex-row mb-1">
                      <div class="pr-1">
                        <label class="switch">
                          <input type="checkbox" id="ccb-toggle-ccb_komoot">
                          <span class="slider round"></span>
                        </label>
                      </div>    
                      <div class="pl-2 pr-5">Komoot</div>
                      <div class="pl-2 pr-5">Embed Komoot Tracks in this website</div>
                    </div>
                  
                </div>
                <div class="modal-footer d-flex flex-column">
                  <button type="button" class="btn btn-success mt-3 btn-lg btn-block" id="ccb-btnAcceptAll">
                    Accept All
                  </button>
                   <button type="button" class="btn mt-3 btn-lg btn-block" id="ccb-btnAcceptSelected">
                    Accept only selected
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;


    jQuery('body').prepend(data);
    jQuery('#ccb-notification-head').append(ccb.strings.notificationHead);
    jQuery('#ccb-notification-text').html(ccb.strings.notificationText);
    jQuery('#ccb-btnAcceptAll').html(ccb.strings.btnAcceptAll);
    jQuery('#ccb-btnAcceptAll').click(function() {
        jQuery.each(ccb.cookies, function (key, value) {
            if (!ccb.cookies[key].disabled) {
                ccb.cookies[key].allowed = true;
            }
        });
        ccb.closeBanner();
    });
    jQuery('#ccb-btnAcceptSelected').html(ccb.strings.btnAcceptSelected);
    jQuery('#ccb-btnAcceptSelected').click(function() {
        jQuery.each(ccb.cookies, function (key, value) {
            if (!ccb.cookies[key].disabled) {
                ccb.cookies[key].allowed = jQuery(`#ccb-toggle-${key}`).is(":checked");
            }
        });
        ccb.closeBanner();
    });
    jQuery.each(ccb.cookies, function (key, value) {
        jQuery(`#ccb-toggle-${key}`).attr('checked', ccb.cookies[key].allowed);
        jQuery(`#ccb-toggle-${key}`).attr('disabled', ccb.cookies[key].disabled);
    });
    $('#cookieDialog').modal('show')
},
closeBanner: function () {
    $('#cookieDialog').modal('hide')
    ccb.consent_approved = true;
    jQuery.each(ccb.cookies, function (key, value) {
        ccb.setCookie(key, ccb.cookies[key].allowed);
    });
    ccb.executeScripts();
},
executeScripts: function () {
    jQuery('script.ccb-cookie-consent[type="text/plain"]').each(function () {
        key = jQuery(this).attr("ccb-cookie-type");
        if (ccb.cookies[key].allowed) {
            if (jQuery(this).attr('src')) {
                jQuery(this).after('<script type="text/javascript" src="' + jQuery(this).attr('src') + '"></script>');
            } else {
                jQuery(this).after('<script type="text/javascript">' + jQuery(this).html() + '</script>');
            }
            jQuery(this).remove();
        }
    });
    jQuery('.cookie-wrapper').each(function () {
        key = jQuery(this).attr("ccb-cookie-type");
        jQuery(this).empty()
        if (ccb.cookies[key].allowed) {
            switch (key) {
                case "ccb_youtube":
                    let youtube = jQuery(this).attr("youtube")
                    jQuery(this).append('<iframe src="https://www.youtube.com/embed/' + youtube + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
                case "ccb_komoot":
                    let komoot = jQuery(this).attr("komoot")
                    let token = jQuery(this).attr("token")
                    jQuery(this).append('<iframe src="https://www.komoot.com/de-de/tour/' + komoot + '/embed?share_token=' + token + '&profile=1" width="100%" height="700" frameborder="0" scrolling="no"></iframe>')
            }
        } else {
            jQuery(this).append(`<div class="youtube-placeholder">
    <svg onclick="ccb.showBanner()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506.25" fill="currentColor">
        <g paint-order="fill markers stroke">
            <path d="M0 0 H900 v506.25 H0 z"></path>
            <circle cx="270" cy="100" r="40" opacity=".675" fill="#fff"></circle>
            <path d="m100 400 195 -195 85 85 164 -164 256 274 z" opacity=".675" fill="#fff"></path>
            <text x="248" y="475" fill="#fff" opacity=".675" font-size="xx-large">Click here to show cookie banner</text>
        </g>
    </svg>
</div>`);
        }
    });
},
isPersonalAdsAllowed: function() {
    return ccb.cookies["ccb_advertising"].allowed;
}
}