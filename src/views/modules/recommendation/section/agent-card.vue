<template>
  <q-card flat class="q-mt-lg bg-transparent">
    <q-card-actions v-if="agent != null" align="center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          class="q-mr-md"
          bg-color="amber-7"
          sent
          :stamp="getTimeStamp()"
          :text="['Here are our recommendations for you...']"
        />
      </div>

      <q-avatar size="64px">
        <img :src="imagelink" />
      </q-avatar>

      <q-item>
        <q-item-section>
          <q-item-label lines="1" class="text-subtitle1 text-grey-10 text-weight-medium">{{
            agent.firstName + " " + agent.lastName
          }}</q-item-label>
          <q-item-label lines="1"> {{ agent.licenseNo }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  // Vue Import
  import { computed, PropType } from "vue";

  // .ts files
  import { Agent } from "@/interfaces/agent";
  import { BLOB_URL } from "@/constants";
  import { PLACEHOLDER_THUMBNAIL } from "@/constants";

  const props = defineProps({
    agent: {
      type: Object as PropType<Agent>,
      required: true
    },
    recommendationDate: {
      type: Date,
      required: false
    }
  });

  const imagelink = computed(() => {
    const url = `${BLOB_URL}/${props.agent.imagePath}`;
    return url || PLACEHOLDER_THUMBNAIL;
  });

  const getTimeStamp = () => {
    if (props.recommendationDate) {
      const createdAt: Date = new Date(props.recommendationDate); // Explicitly type createdAt
      const currentTime: Date = new Date();
      const timeDifference: number = currentTime.getTime() - createdAt.getTime();
      if (timeDifference < 60000) {
        // Less than a minute
        return `${Math.floor(timeDifference / 1000)} seconds ago`;
      } else if (timeDifference < 3600000) {
        // Less than an hour
        return `${Math.floor(timeDifference / 60000)} minutes ago`;
      } else if (timeDifference < 86400000) {
        // Less than a day
        return `${Math.floor(timeDifference / 3600000)} hours ago`;
      } else if (timeDifference < 2592000000) {
        // Less than a month
        return `${Math.floor(timeDifference / 86400000)} days ago`;
      } else if (timeDifference < 31536000000) {
        // Less than a year
        return `${Math.floor(timeDifference / 2592000000)} months ago`;
      } else {
        return `${Math.floor(timeDifference / 31536000000)} years ago`;
      }
    }

    return "";
  };
</script>
