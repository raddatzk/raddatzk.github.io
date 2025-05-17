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
  },{id: "post-training-for-stoneman-dolomiti-hike",
      
        title: "Training for Stoneman Dolomiti Hike",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/05/15/stoneman-training.html";
        
      },
    },{id: "post-stoneman-dolomiti-hike",
      
        title: "Stoneman Dolomiti Hike",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/05/10/stoneman-dolomiti-hike.html";
        
      },
    },{id: "post-my-holiday-on-tenerife",
      
        title: "My Holiday on Tenerife",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/private/2025/05/02/tenerife.html";
        
      },
    },];
