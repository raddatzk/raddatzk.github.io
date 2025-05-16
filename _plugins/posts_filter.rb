module Jekyll
  module PostFilter
    def filter_category(posts, category)
      filtered = posts

      # Filter by category if provided
      filtered.select { |post| post.data['categories'].include?(category) }
    end

    def filter_series(posts, series)
      filtered = posts

      # Filter by series if provided
      filtered.select { |post| post.data['series'] == series }
    end

    def filter_featured(posts)
      filtered = posts

      # Filter by series if provided
      filtered.select { |post| post.data['featured'] == true }
    end
  end
end

Liquid::Template.register_filter(Jekyll::PostFilter)