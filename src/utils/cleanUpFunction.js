import BriklGQL from "./baesGQL";
import { queryName } from "../constant/constant";

const cleanLightSettingNBE = async (token) => {
  const shopid = "3ddd1f77-23b5-4bc7-9059-c32cc1338723";
  const rsp = await BriklGQL(queryName.GET_LIGHT_NBE, token, shopid);

  rsp.data?.productLightPresets.forEach(async (light) => {
    if (light.title.startsWith("E2E ")) {
      console.log(`delete ${light.title}`);
      await BriklGQL(queryName.DELETE_LIGHT_NBE, token, shopid, {
        id: light.id,
      });
    }
  });
};

const cleanLightSettingCI2 = async (token) => {
  const shopId = "667674bf-c3f8-4444-8127-29c77c7e6530";
  console.log(shopId);
};

export { cleanLightSettingNBE, cleanLightSettingCI2 };
