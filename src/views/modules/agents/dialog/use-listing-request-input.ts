import { notify } from "@/utils/notify";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { ListingRequest } from "@/interfaces/listing-request";
import axios from "axios";

function newInput() {
  return {
    features: [] as number[],
    listingMode: 1,
    noOfBedRooms: 1,
    bathRoom: 1,
    createdAt: new Date(),
    modifiedAt: new Date()
  } as ListingRequest;
}

const listingRequestInput = ref<ListingRequest>(newInput());

const bedrooms = ref([
  { label: "Studio", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 }
]);

const bathrooms = ref([
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5+", value: 5 }
]);

const toolTipCreate = ref("listingRequest.gallery.uploadNewImage");

export function useListingRequestInput() {
  const { t } = useI18n();

  function resetListingInput() {
    listingRequestInput.value = newInput();
  }

  function successCallback(successMessage: string) {
    notify(successMessage, "positive");
  }

  function createListingRequest(onDialogCancel: () => void) {
    // Create a new listingRequest record
    axios
      .post(`/ListingRequest`, listingRequestInput.value)
      .then(response => {
        // assign listingRequestId value back to listingRequestInput
        const listingRequestId = response.data.listingRequestId;
        listingRequestInput.value.listingRequestId = listingRequestId;

        const successMessage = t("listingRequest.message.created");
        successCallback(successMessage);
        onDialogCancel();
      })
      .catch(errors => {
        notify(errors.message, "negative");
      });
  }

  return {
    successCallback,
    listingRequestInput,
    createListingRequest,

    toolTipCreate,
    bedrooms,
    bathrooms,
    resetListingInput
  };
}
