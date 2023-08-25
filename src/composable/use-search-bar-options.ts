import { useI18n } from "vue-i18n";

export const translate = (label: string, meta: any) => {
  const { locale } = useI18n({ useScope: "global" });

  switch (locale.value) {
    case "hk":
      if (meta === null || meta === undefined || meta.hk === null || meta.hk === undefined) {
        return label;
      }
      return meta.hk;
    case "cn":
      if (meta === null || meta === undefined || meta.cn === null || meta.cn === undefined) {
        return label;
      }
      return meta.cn;
    default:
      return label;
  }
};

export const sumBits = (arr: number[]) => {
  const result = arr.reduce((result: any, current: any) => {
    // Add up the bits from the array
    const temp = current > 0 && current <= 16 ? 1 << (current - 1) : 0;
    return result + temp;
  }, 0);

  return result;
};

export function splitDisctrict(districts: any) {
  const half = Math.ceil(districts.length / 2);
  const firstHalf = districts.slice(0, half);
  const secondHalf = districts.slice(half);

  return [firstHalf, secondHalf].map(half =>
    half.map((district: any) => ({
      value: district.districtId,
      label: district.districtName,
      meta: {
        hk: district.meta?.i18n?.hk?.districtName,
        cn: district.meta?.i18n?.cn?.districtName
      }
    }))
  );
}

export function extractAmenities(data: any) {
  return data["amenities"].map((features: any) => ({
    value: features.amenityId,
    label: features.amenityName,
    amenityValue: features.amenityValue,
    meta: {
      hk: features.meta?.i18n?.hk?.amenityName,
      cn: features.meta?.i18n?.cn?.amenityName
    }
  }));
}

export function extractLocation(data: any) {
  return data["areaInfo"].map((area: any) => {
    const [option, option1] = splitDisctrict(area.districts);
    return {
      value: area.areaId,
      label: area.areaName,
      meta: {
        hk: area.meta?.i18n?.hk?.areaName,
        cn: area.meta?.i18n?.cn?.areaName
      },
      district: [],
      expanded: false,
      option,
      option1
    };
  });
}
