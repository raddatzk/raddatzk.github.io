---
---
var ccb =
    {
        version: '0.0.2',
        jqueryattempts: 0,
        setupcomplete: false,
        show_banner: true,
        consent_approved: false,
        style: "{{ site.cookieconsent.style }}",
        cookies: {
{% for cookie in site.cookieconsent.cookies %}
{{ cookie.name }}: {
    title: "{{ cookie.title }}",
        description: "{{ cookie.description }}",
        action: "{{ cookie.action }}",
        disabled: {{ cookie.disabled }},
    allowed: {{ cookie.allowed }},
    loaded: false
},
{% endfor %}
},

strings: {
    notificationHead: "{{ site.cookieconsent.notificationHead }}",
        notificationText: "{{ site.cookieconsent.notificationText }}",
        btnAcceptAll: "{{ site.cookieconsent.btnAcceptAll }}",
        btnAcceptSelected: "{{ site.cookieconsent.btnAcceptSelected }}",
        btnMore: "{{ site.cookieconsent.btnMore }}",
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
                  {% for cookie in site.cookieconsent.cookies %}
                    <div class="d-flex flex-row mb-1">
                      <div class="pr-1">
                        <label class="switch">
                          <input type="checkbox" id="ccb-toggle-{{ cookie.name }}">
                          <span class="slider round"></span>
                        </label>
                      </div>    
                      <div class="pl-2 pr-5">{{ cookie.title }}</div>
                      <div class="pl-2 pr-5">{{ cookie.action }}</div>
                    </div>
                  {% endfor %}
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
            switch(key) {
                case "ccb_youtube":
                    let youtube = jQuery(this).attr("youtube")
                    jQuery(this).append('<iframe src="https://www.youtube.com/embed/' + youtube + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
            }
        } else {
            jQuery(this).append(`{% include iframe_placeholder.liquid %}`);
        }
    });
},
isPersonalAdsAllowed: function() {
    return ccb.cookies["ccb_advertising"].allowed;
}
}