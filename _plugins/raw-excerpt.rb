# frozen_string_literal: true

module RawContent
  class Generator < Jekyll::Generator
    def generate(site)
      site.posts.each do |post|
        # puts("hello")
        # puts(post.content)
        # puts(post.data["excerpt"].content)
        post.data['raw_excerpt'] = post.data["excerpt"].content
      end
    end
  end
end