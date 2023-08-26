<template>
  <q-card flat square>
    <q-card-section class="q-pa-none bg-transparent">
      <q-img src="@/assets/img/scrap.jpg" fit="cover" :ratio="3 / 1">
        <q-item class="absolute-full text-subtitle2 flex flex-center justify-center items-center">
          <q-item-section class="items-center">
            <q-item-label class="text-h3 text-white">{{ $t("services.title") }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-img>
    </q-card-section>
  </q-card>

  <q-card-section class="q-ma-xl q-pa-none column justify-center items-center">
    <q-card-section class="q-ma-none q-pa-none" style="width: 128px">
      <q-item-section class="text-h4 text-dark text-center">METALS</q-item-section>
      <q-item-section><q-separator color="orange" inset /></q-item-section>
    </q-card-section>

    <q-card-section
      class="q-ma-none q-pa-none text-h6 text-weight-light text-center q-my-lg"
      style="width: 800px"
    >
      <div>
        At SUNGAIN we handle large quantities of Ferrous and Non Ferrous metal every year and always
        offer competitive prices.
      </div>
    </q-card-section>
  </q-card-section>

  <sub-services :subservices="metal" />

  <q-card-section class="q-ma-xl q-pa-none column justify-center items-center">
    <q-card-section class="q-ma-none q-pa-none" style="width: 128px">
      <q-item-section class="text-h4 text-dark text-center">PLASTIC</q-item-section>
      <q-item-section><q-separator color="orange" inset /></q-item-section>
    </q-card-section>

    <q-card-section
      class="q-ma-none q-pa-none text-h6 text-weight-light text-center q-my-lg"
      style="width: 800px"
    >
      <div>
        At SUNGAIN we handle large quantities of Ferrous and Non Ferrous metal every year and always
        offer competitive prices.
      </div>
    </q-card-section>
  </q-card-section>

  <sub-services :subservices="plastic" />

  <q-card-section class="q-ma-xl q-pa-none column justify-center items-center">
    <q-card-section class="q-ma-none q-pa-none" style="width: 128px">
      <q-item-section class="text-h4 text-dark text-center">PAPER</q-item-section>
      <q-item-section><q-separator color="orange" inset /></q-item-section>
    </q-card-section>

    <q-card-section
      class="q-ma-none q-pa-none text-h6 text-weight-light text-center q-my-lg"
      style="width: 800px"
    >
      <div>
        At SUNGAIN we handle large quantities of Ferrous and Non Ferrous metal every year and always
        offer competitive prices.
      </div>
    </q-card-section>
  </q-card-section>

  <sub-services :subservices="paper" />

  <q-card-section class="q-ma-xl q-pa-none column justify-center items-center">
    <q-card-section class="q-ma-none q-pa-none" style="width: 128px">
      <q-item-section class="text-h4 text-dark text-center">GLASS</q-item-section>
      <q-item-section><q-separator color="orange" inset /></q-item-section>
    </q-card-section>

    <q-card-section
      class="q-ma-none q-pa-none text-h6 text-weight-light text-center q-my-lg"
      style="width: 800px"
    >
      <div>
        At SUNGAIN we handle large quantities of Ferrous and Non Ferrous metal every year and always
        offer competitive prices.
      </div>
    </q-card-section>
  </q-card-section>

  <sub-services :subservices="glass" />

  <q-card-section class="q-ma-xl q-pa-none column justify-center items-center">
    <q-card-section class="q-ma-none q-pa-none" style="width: 128px">
      <q-item-section class="text-h4 text-dark text-center">ELECTRONIC</q-item-section>
      <q-item-section><q-separator color="orange" inset /></q-item-section>
    </q-card-section>

    <q-card-section
      class="q-ma-none q-pa-none text-h6 text-weight-light text-center q-my-lg"
      style="width: 800px"
    >
      <div>
        At SUNGAIN we handle large quantities of Ferrous and Non Ferrous metal every year and always
        offer competitive prices.
      </div>
    </q-card-section>
  </q-card-section>

  <sub-services :subservices="electronics" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import SubServices from "./sub-services.vue";
  import TinImage from "@/assets/img/tin.jpg";
  import BrassImage from "@/assets/img/brass.png";
  import PlasticImage from "@/assets/img/plastic.jpg";
  import Plastic2Image from "@/assets/img/plastic2.jpg";
  import GlassImage from "@/assets/img/glass.jpg";
  import Glass2Image from "@/assets/img/glass-2.jpg";
  import VehicleRecycling from "@/assets/img/vehicle-recycling.jpg";
  import ElectronicsRecycling from "@/assets/img/gettyimages-494832555-scaled.webp";

  const metal = ref([
    {
      id: 1,
      img: TinImage,
      tagline: "METAL",
      title: "FERROUS METALS",
      description: `We deal with large and small companies, local authorities, tradesman and the general
          public and accept scrap metal quantities of any size. With a collection service covering
          all of London and the surrounding areas we are more than capable of meeting your
          requirements.`
    },
    {
      id: 2,
      img: BrassImage,
      tagline: "Material We Accept",
      title: "NON-FERROUS METALS",
      description: `We deal with large and small companies, local authorities, tradesman and the general
          public and accept scrap metal quantities of any size. With a collection service covering
          all of London and the surrounding areas we are more than capable of meeting your
          requirements.`
    }
  ]);

  const electronics = ref([
    {
      id: 1,
      img: VehicleRecycling,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    },
    {
      id: 2,
      img: ElectronicsRecycling,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    }
  ]);

  const plastic = ref([
    {
      id: 1,
      img: PlasticImage,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    },
    {
      id: 2,
      img: Plastic2Image,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    }
  ]);

  const paper = ref([
    {
      id: 1,
      img: PlasticImage,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    },
    {
      id: 2,
      img: Plastic2Image,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    }
  ]);

  const glass = ref([
    {
      id: 1,
      img: GlassImage,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    },
    {
      id: 2,
      img: Glass2Image,
      tagline: "PVC",
      title: "PVC",
      description: `We deal with large and small companies, local authorities, tradesman and the general
            public and accept scrap metal quantities of any size. With a collection service covering
            all of London and the surrounding areas we are more than capable of meeting your
            requirements.`
    }
  ]);
</script>
