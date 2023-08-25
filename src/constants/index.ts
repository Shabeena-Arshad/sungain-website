export const ageGroups = ["13-18", "19-29", "30-39", "40-49", "50-59", "51-60", "Above 60"];

export const AppVersion = "1.0.0";

export const FetchStatus = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export const ContentOption = {
  CONTACT: "Contact",
  HOME: "Home",
  LISTING: "Listing",
  ABOUT: "About"
};

export enum SearchMode {
  Buy = "buy",
  Rent = "rent"
}

export const BASE_URL = import.meta.env.VITE_API_URL;
export const BLOB_URL = import.meta.env.VITE_BLOB_URL;
export const SEARCH_OPTION_DATA_URL = `${BASE_URL}/PropertyListing/GetSearchOptionData`;
export const AGENT_URL = `${BASE_URL}/Agent`;

// Listing URL
export const FOR_RENT_PROPERTIES_URL = `${BASE_URL}/PropertyListing/Rent`;
export const FOR_SALE_PROPERTIES_URL = `${BASE_URL}/PropertyListing`;
export const HERO_PROPERTIES_URL = `${BASE_URL}/PropertyListing/HeroProperties`;
export const Latest_PROPERTIES_URL = `${BASE_URL}/PropertyListing/GetLatestListing`;
export const FEATURED_PROPERTIES_URL = `${BASE_URL}/PropertyListing/FeatureProperties`;

// Content URL
export const ABOUT_INTRO_URL = `${BASE_URL}/Content/ContentByName/About`;
export const AGENT_CONTENT_URL = `${BASE_URL}/Content/ContentByName/Agent`;
export const FOOTER_CONTENT_URL = `${BASE_URL}/Content/ContentByName/Contact`;
export const LISTING_IMAGE_URL = `${BASE_URL}/Content/ContentByName/Listing`;
export const LISTING_INTRO_URL = `${BASE_URL}/Content/ContentByName/Listing`;

//Amenity URL
export const AMENITY_URL = `${BASE_URL}/Amenity`;

export const PLACEHOLDER_THUMBNAIL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
