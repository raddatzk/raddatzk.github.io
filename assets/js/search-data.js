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
  },{id: "post-2025-stoneman-dolomiti-hike",
      
        title: "2025 | Stoneman Dolomiti Hike",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/05/02/stoneman-dolomiti-hike.html";
        
      },
    },{id: "post-2024-teneriffa",
      
        title: "2024 | Teneriffa",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/05/02/teneriffa.html";
        
      },
    },];
