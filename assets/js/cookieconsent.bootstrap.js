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
        description: "YouTube: Enable embedding YouTube videos",
        disabled: false,
    allowed: false,
    expirydays: 365,
    loaded: false,
        iframe_placeholder: ""
},

},

strings: {
    notificationHead: "This web site uses cookies",
        notificationText: "We use cookies for providing our services on this page. While some of them are necessary, others help us to improve our online offering and operate it economically. Accept the optional cookies or reject them by clicking on the \"Accept Only Selected\" button. These settings can be revoked at any time. For more information please refer to our <a href=\"/datapolicy\">data policy</a>.",
        btnAcceptAll: "Accept All",
        btnAcceptSelected: "Accept Only Selected",
        btnMore: "More",
},

onfirstload: function () {
    if (!ccb.setupcomplete) {
        if (!(window.jQuery)) {
            ccb.jqueryattempts++;
            if (ccb.jqueryattempts >= 5) {
                return;
            }
            setTimeout(ccb.onfirstload, 200);
            return;
        }
        ccb.setupcomplete = true;
    }
    ccb.checkapproval();
},
initialise: function (obj) {
    if (obj.show_banner !== undefined) {
        ccb.show_banner = obj.show_banner;
    }
    // check if jquery has been loaded
    ccb.onfirstload();
},
checkapproval: function () {
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
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        cookieval =  unescape(y);
        if (cookieval) {
            if (x in ccb.cookies) {
                if (cookieval == "true") {
                    ccb.cookies[x].allowed = true;
                } else {
                    ccb.cookies[x].allowed = false;
                }
                ccb.cookies[x].loaded = true;
            }
        }
    }
    ccb.consent_approved = true;
    jQuery.each(ccb.cookies, function (key, value) {
        if (!ccb.cookies[key].loaded) {
            ccb.consent_approved = false;
        }
    });
},
setcookie: function (name, value, expirydays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expirydays);
    document.cookie = name + '=' + value + '; expires=' + exdate.toUTCString() + '; path=/' + '; SameSite=Strict'
},
showBanner: function () {
    jQuery('#ccb-notification').remove();
    if (ccb.style == "dark") {
        background_color = "bg-dark";
        text_color = "text-white";
        btn_select_color = "btn-outline-light";
    } else {
        background_color = "bg-light";
        text_color = "text-black";
        btn_select_color = "btn-outline-dark";
    }
    data = `
          <div class="modal fade show" id="cookieDialog" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content ${background_color} ${text_color}">
                <div class="modal-header">
                  <h4><div id="ccb-notification-head"><i class="fas fa-cookie-bite"></i>&nbsp;</div></h4>
                </div>
                <div class="modal-body">
                  <p><div id="ccb-notification-text"></div></p>
                  <div id="ccb-cookie-list" class="d-flex flex-row mb-1"></div>
                  <div class="collapse" id="collapseCookieDetails">
                    <div class="d-flex flex-column mb-1" id="ccb-cookie-details">
                    </div>
                  </div>
                </div>
                <div class="modal-footer d-flex flex-column">
                  <button type="button" class="btn btn-success mt-3 btn-lg btn-block" id="ccb-btnAcceptAll">
                    Accept All
                  </button>
                   <button type="button" class="btn ${btn_select_color} mt-3 btn-lg btn-block" id="ccb-btnAcceptSelected">
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
        data_cookie = `
            <div class="pr-1">
              <label class="switch">
                <input type="checkbox" id="ccb-toggle-${key}">
                <span class="slider round"></span>
              </label>
            </div>
            <div class="pl-2 pr-5">${ccb.cookies[key].title}</div>
          `;
        data_more = `
            <div class="mt-2">${ccb.cookies[key].description}</div>
          `;
        jQuery('#ccb-cookie-list').append(data_cookie);
        jQuery('#ccb-cookie-details').append(data_more);
        jQuery(`#ccb-toggle-${key}`).attr('checked', ccb.cookies[key].allowed);
        jQuery(`#ccb-toggle-${key}`).attr('disabled', ccb.cookies[key].disabled);
    });
    data_more = `
          <div>
            <a data-toggle="collapse" href="#collapseCookieDetails" role="button" aria-expanded="false" aria-controls="collapseCookieDetails">
              ${ccb.strings.btnMore}...
            </a>
          </div>
        `;
    jQuery('#ccb-cookie-list').append(data_more);
    $('#cookieDialog').modal('show')
},
closeBanner: function () {
    $('#cookieDialog').modal('hide')
    ccb.consent_approved = true;
    jQuery.each(ccb.cookies, function (key, value) {
        ccb.setcookie(key, ccb.cookies[key].allowed, ccb.cookies[key].expirydays);
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
    jQuery('iframe.ccb-cookie-consent').each(function () {
        key = jQuery(this).attr("ccb-cookie-type");
        if (ccb.cookies[key].allowed) {
            jQuery(this).attr("src", jQuery(this).attr("data-src"));
        } else {
            jQuery(this).after(`<div class="youtube-placeholder">
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="506.25" viewBox="0 0 180.119 139.794" fill="currentColor">
        <g transform="translate(-47.59 -66.639)" paint-order="fill markers stroke">
            <path d="M13.591 66.639H293.71v139.794H13.591z"/>
            <path d="m152.507 133.514-34.249 34.249-15.968-15.968-41.938 41.937H212.726z" opacity=".675" fill="#fff"/>
            <circle cx="92.217" cy="108.555" r="11.773" opacity=".675" fill="#fff"/>
            <path fill="none" d="M26.111 77.634h152.614v116.099H26.111z"/>
        </g>
    </svg>
</div>`);
            jQuery(this).remove();
        }
    });
},
isPersonalAdsAllowed: function() {
    return ccb.cookies["ccb_advertising"].allowed;
}
}