<template>
  <suspense>
    <template #default>
      <q-card flat>
        <q-item class="q-py-md">
          <q-item-section avatar>
            <q-btn outline round color="black">
              <q-avatar size="56px">
                <img :ratio="1" :src="avatar" />
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="text-subtitle1 text-grey-10">{{
              agent?.firstName
            }}</q-item-label>
            <q-item-label class="text-subtitle1 text-grey-10">
              {{ $t("propertyListing.format.licenseNo", { licenseNo: agent?.licenseNo }) }}
            </q-item-label>
            <q-item-label lines="1">
              <q-chip clickable icon="email" size="sm" @click="navigateToEmail">
                {{ $t("agent.email") }}
              </q-chip>
              <q-chip clickable icon="fa-brands fa-whatsapp" size="sm" @click="navigateToWhatsApp">
                {{ $t("agent.whatsapp") }}
              </q-chip></q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card>
    </template>

    <template #fallback>
      <div class="row justify-center items-center" style="height: 500px">
        <app-spinner size="1em" />
      </div>
    </template>
  </suspense>
</template>

<script setup lang="ts">
  // Vue Import
  import { onBeforeMount, ref } from "vue";

  // 3rd Party Import
  import axios from "axios";

  // .ts file
  import { Agent } from "@/interfaces/agent";
  import { BLOB_URL } from "@/constants";
  import boyAvatarImage from "@/assets/img/boy-avatar.png";

  // Custom Components
  import AppSpinner from "@/components/widgets/app-spinner.vue";

  const props = defineProps({
    propertyListingId: {
      type: Number,
      required: false
    }
  });

  const agent = ref<Agent>();
  const avatar = ref<string>();

  function navigateToEmail() {
    const emailTo = agent.value?.email;
    const emailSubject = "Property Inquiry";
    const mailtoURL = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;

    window.location.href = mailtoURL;
  }

  function navigateToWhatsApp() {
    const whatsappURL = `https://wa.me/${agent.value?.phone}?text=Hello,%20I'm%20interested%20in%20your%20property.`;
    window.open(whatsappURL, "_blank");
  }

  onBeforeMount(async () => {
    try {
      const response = await axios.get<Agent>(`/Agent/AgentByListingId/${props.propertyListingId}`);
      agent.value = response.data;
      avatar.value = `${BLOB_URL}/${agent.value.imagePath}`;
    } catch (error) {
      console.error("Error fetching agent data:", error);

      // Assign dummy data when API response is null
      agent.value = {
        agentId: 11,
        firstName: "Muhammad",
        licenseNo: "IP34556",
        email: "muhammad@example.com",
        phone: "1234567890",
        imagePath: boyAvatarImage
      } as Agent;
    }
  });
</script>
