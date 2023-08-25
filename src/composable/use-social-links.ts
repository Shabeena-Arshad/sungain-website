// use-social-links.ts
import { ref } from "vue";

export const useSocialLinks = () => {
  const socialLinks = ref([
    {
      key: "facebook",
      icon: "fa-brands fa-facebook-f",
      link: "https://www.facebook.com/rentbuysellhongkong/"
    },
    {
      key: "linkedin",
      icon: "fa-brands fa-linkedin-in",
      link: "https://www.linkedin.com/company/insight-property-consultants-ltd/about/"
    }
  ]);

  return { socialLinks };
};
