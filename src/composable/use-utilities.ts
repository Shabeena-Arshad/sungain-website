// useUtilities.ts
import { date, EventBus, Notify } from "quasar";
import { useI18n } from "vue-i18n";

export function useUtilities() {
  const eventBus = new EventBus();

  function dateFormatter(value: string | number | Date) {
    return date.formatDate(value, "YYYY-MM-DD");
  }

  function formatDate(value: string | number | Date) {
    return date.formatDate(value, "YYYY-MM-DD");
  }

  function isNotEmptyArray(arr: any) {
    return Array.isArray(arr) && arr.length > 0;
  }

  function isNthBitSet(value: number, n: number): boolean {
    return (value & (1 << (n - 1))) !== 0;
  }

  function notify(message: string, type: string) {
    Notify.create({
      message: message,
      type: type
    });
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function splitAmenity(amenity: any) {
    const half = Math.ceil(amenity.length / 2);
    const firstHalf = amenity.slice(0, half);
    const secondHalf = amenity.slice(half);

    return [firstHalf, secondHalf].map(half =>
      half.map((amenity: any) => ({
        value: amenity.amenityId,
        label: amenity.amenityName,
        meta: {
          hk: amenity.meta?.i18n?.hk,
          cn: amenity.meta?.i18n?.cn
        }
      }))
    );
  }

  function translate(label: string, meta: any, key: string) {
    const { locale } = useI18n({ useScope: "global" });

    switch (locale.value) {
      case "hk":
        return meta?.i18n?.hk?.[key] ?? label;
      case "cn":
        return meta?.i18n?.cn?.[key] ?? label;
      default:
        return label;
    }
  }

  function translateAddress(meta: any) {
    const { locale } = useI18n({ useScope: "global" });
    let addresses = [];

    let localeMeta = { address1: "", address2: "", address3: "" };

    if (locale.value == "hk") {
      localeMeta = meta?.i18n?.["hk"] ?? localeMeta;
    } else if (locale.value == "cn") {
      localeMeta = meta?.i18n?.["cn"] ?? localeMeta;
    } else {
      localeMeta = meta?.i18n?.["en"] ?? localeMeta;
    }

    addresses = [
      { key: "address1", value: localeMeta?.address1 || "" },
      { key: "address2", value: localeMeta?.address2 || "" },
      { key: "address3", value: localeMeta?.address3 || "" }
    ];
    return addresses;
  }

  function formatPrice(price: number) {
    if (price <= 0) {
      return "0";
    } else if (price >= 1e8) {
      return (price / 1e6).toFixed(0).replace(/\.0$/, "") + " M";
    } else if (price >= 1e7) {
      return (price / 1e6).toFixed(1).replace(/\.0$/, "") + " M";
    } else if (price >= 1e6 && price < 1e7) {
      return (price / 1e6).toFixed(2).replace(/\.0$/, "") + " M";
    } else if (price >= 1e3) {
      return (price / 1e3).toFixed(1).replace(/\.0$/, "") + " K";
    } else {
      return price.toFixed(2).replace(/\.0$/, "");
    }
  }

  return {
    dateFormatter,
    eventBus,
    formatDate,
    formatPrice,
    isNotEmptyArray,
    isNthBitSet,
    notify,
    sleep,
    splitAmenity,
    translate,
    translateAddress
  };
}
