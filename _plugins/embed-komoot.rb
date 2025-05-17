module Jekyll
  module Tags
    class KomootTag < Liquid::Tag
      def initialize(tag_name, parameters, tokens)
        super
        parameter = parameters.split(" ")
        @id = parameter[0]
        @token = parameter[1]
      end

      def render(context)
        "<div class=\"cookie-wrapper komoot-wrapper\" ccb-cookie-type=\"ccb_komoot\" komoot=\"#{@id}\" token=\"#{@token}\"></div>"
      end

    end
  end
end

Liquid::Template.register_tag('komoot', Jekyll::Tags::KomootTag)