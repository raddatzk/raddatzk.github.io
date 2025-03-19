// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-",
    title: "",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/private/blog";
              },
            },{id: "post-2024-teneriffa-2",
      
        title: "2024 | Teneriffa 2",
      
      description: "Explore the adventurous side of tenerife",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/03/13/teneriffa-2.html";
        
      },
    },{id: "post-2024-teneriffa",
      
        title: "2024 | Teneriffa",
      
      description: "Explore the adventurous side of tenerife",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/03/13/teneriffa.html";
        
      },
    },{id: "post-a-post-with-formatting-and-links-2",
      
        title: "a post with formatting and links 2",
      
      description: "march &amp; april, looking forward to summer",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/professional/2015/03/15/formatting-and-links2.html";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/professional/2015/03/15/formatting-and-links.html";
        
      },
    },];
