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
  },{id: "post-2024-teneriffa",
      
        title: "2024 | Teneriffa",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/03/13/teneriffa.html";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/professional/2015/03/15/formatting-and-links.html";
        
      },
    },];
