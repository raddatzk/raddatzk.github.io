module Jekyll
  module Tags
    class YoutubeTag < Liquid::Tag
      def initialize(tag_name, id, tokens)
        super
        @id = id
      end

      def render(context)
        "<div class=\"cookie-wrapper youtube-wrapper\" ccb-cookie-type=\"ccb_youtube\" youtube=\"#{@id}\"></div>"
      end

    end
  end
end

Liquid::Template.register_tag('youtube', Jekyll::Tags::YoutubeTag)