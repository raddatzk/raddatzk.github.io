# frozen_string_literal: true

module RawContent
  class Generator < Jekyll::Generator
    def generate(site)
      site.posts.docs.each do |post|
        post.data['raw_excerpt'] = post.data["excerpt"].content
      end
    end
  end
end