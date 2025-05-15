require 'nokogiri'

module Jekyll
  class ExternalLinkAccessibility
    def self.modify_links(page)
      if page.ext.eql?('.md')
        config = page.site.config
        doc = Nokogiri::HTML5(page.output)
        doc.css('a').each do |a|
          next if a['href'].nil? || a['href'].empty? || a['href'].start_with?('#') || a['data-no-external'] == 'true' || a['href'].start_with?(url(config: config)) || a['href'].start_with?('/') || a['href'].start_with?('mailto:')

          if a['href'].start_with?('https://amzn.to')
            a.add_child(" <i class='fab fa-amazon'></i>")
          elsif a['href'].start_with?('https://www.instagram.com')
            a.add_child(" <i class='fab fa-instagram'></i>")
          else
            a.add_child(" <i class='fas fa-arrow-up-right-from-square'></i>")
          end
        end
        page.output = doc.to_html
      end
    end

    def self.url(config:)
      config.dig('url')
    end

    private_class_method :url
  end
end

Jekyll::Hooks.register :posts, :post_render do |page|
  Jekyll::ExternalLinkAccessibility.modify_links(page)
end

Jekyll::Hooks.register :pages, :post_render do |page|
  Jekyll::ExternalLinkAccessibility.modify_links(page)
end