source 'https://rubygems.org'

gem 'jekyll'

# Core plugins that directly affect site building
group :jekyll_plugins do
    gem 'jekyll-archives-v2'
    gem 'jekyll-feed' # Atom rss feed
    gem 'jekyll-get-json' # site.data via http
    gem 'jekyll-imagemagick' # responsive images
    gem 'jekyll-minifier' # minify html css js...
    gem 'jekyll-paginate-v2' # pagination
    gem 'jekyll-regex-replace'
    gem 'jekyll-sitemap'
    gem 'jekyll-tabs' # add tabs in the content
    gem 'jekyll-terser', :git => "https://github.com/RobertoJBeltran/jekyll-terser.git" # irgendwas mit javascript
    gem 'jekyll-toc'
    gem 'jemoji' # github like emojis
    gem 'jekyll-redirect-from' # some redirects

    gem 'classifier-reborn'  # used for content categorization during the build

    # gem 'jekyll-external-link-accessibility', github: 'fastruby/jekyll-external-link-accessibility' # external links
end

# Gems for development or external data fetching (outside :jekyll_plugins)
group :other_plugins do
    gem 'css_parser'
    gem 'feedjira'
    gem 'httparty'
    # gem 'unicode_utils' -- should be already installed by jekyll
    # gem 'webrick' -- should be already installed by jekyll
end
