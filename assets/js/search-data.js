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
  },{id: "nav-personal",
          title: "personal",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/personal";
          },
        },];
