<template>
  <q-card flat class="q-pa-xl bg-grey-2">
    <q-card-section class="q-pa-none column justify-center items-center">
      <q-card-section class="q-ma-none q-pa-none">
        <q-item-section class="text-h4 text-dark text-center">Testimonials</q-item-section>
        <q-item-section><q-separator color="orange" inset /></q-item-section>
      </q-card-section>

      <q-card-section class="q-ma-none q-pa-none text-h6 text-weight-light text-center q-my-lg">
        <div>What Clients Say</div>
      </q-card-section>
    </q-card-section>
    <q-carousel
      v-model="slide"
      class="bg-grey-2"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="amber"
      padding
      arrows
      infinite
      height="300px"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div flat class="row fit justify-center items-center q-gutter-xs q-col-gutter no-wrap">
          <q-card class="full-height row justify-center items-center">
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-mb-md"
                  ><q-icon name="fa-regular fa-user " size="40px" color="orange"
                /></q-item-label>
                <q-item-label class="text-h6 text-weight-light text-italic q-px-lg">
                  <span class="text-h4 text-bold">"</span>
                  Residents & businesses place co-mingled (mixed) recyclables in the tan cart
                  <span class="text-h4 text-bold">"</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

          <q-card class="full-height row justify-center items-center">
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-mb-md"
                  ><q-icon name="fa-regular fa-user " size="40px" color="orange"
                /></q-item-label>
                <q-item-label class="text-h6 text-weight-light text-italic q-px-lg">
                  <span class="text-h4 text-bold">"</span>
                  Residents & businesses place co-mingled (mixed) recyclables in the tan cart
                  <span class="text-h4 text-bold">"</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="column no-wrap">
        <div flat class="row fit justify-center items-center q-gutter-xs q-col-gutter no-wrap">
          <q-card class="full-height row justify-center items-center">
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-mb-md"
                  ><q-icon name="fa-regular fa-user " size="40px" color="orange"
                /></q-item-label>
                <q-item-label class="text-h6 text-weight-light text-italic q-px-lg">
                  <span class="text-h4 text-bold">"</span>
                  Residents & businesses place co-mingled (mixed) recyclables in the tan cart
                  <span class="text-h4 text-bold">"</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

          <q-card class="full-height row justify-center items-center">
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-mb-md"
                  ><q-icon name="fa-regular fa-user " size="40px" color="orange"
                /></q-item-label>
                <q-item-label class="text-h6 text-weight-light text-italic q-px-lg">
                  <span class="text-h4 text-bold">"</span>
                  Residents & businesses place co-mingled (mixed) recyclables in the tan cart
                  <span class="text-h4 text-bold">"</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="column no-wrap">
        <div flat class="row fit justify-center items-center q-gutter-xs q-col-gutter no-wrap">
          <q-card class="full-height row justify-center items-center">
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-mb-md"
                  ><q-icon name="fa-regular fa-user " size="40px" color="orange"
                /></q-item-label>
                <q-item-label class="text-h6 text-weight-light text-italic q-px-lg">
                  <span class="text-h4 text-bold">"</span>
                  Residents & businesses place co-mingled (mixed) recyclables in the tan cart
                  <span class="text-h4 text-bold">"</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

          <q-card class="full-height row justify-center items-center">
            <q-item>
              <q-item-section class="text-center">
                <q-item-label class="q-mb-md"
                  ><q-icon name="fa-regular fa-user " size="40px" color="orange"
                /></q-item-label>
                <q-item-label class="text-h6 text-weight-light text-italic q-px-lg">
                  <span class="text-h4 text-bold">"</span>
                  Residents & businesses place co-mingled (mixed) recyclables in the tan cart
                  <span class="text-h4 text-bold">"</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const slide = ref(1);
</script>
