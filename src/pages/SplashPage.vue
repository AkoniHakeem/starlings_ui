<template>
  <q-page :style-fn="pageStyleFunc">
    <div
      :style="{
        height: '100vh',
        background: `url('/assets/starling_splash_background.png') center/cover no-repeat`,
      }"
    >
      <div
        :style="{
          height: '64vh',
        }"
        class="flex column flex-center"
      >
        <!-- image -->
        <!-- <transition
          :duration="8000"
          enter-active-class="animated rotateInUpLeft slower"
        > -->
        <!-- <transition
            :duration="8000"
            enter-active-class="splash-starling-animation"
          > -->
        <div :v-show="animate" class="splash-starling-animation">
          <q-img src="/assets/starling_head.png" />
        </div>
        <!-- </transition> -->
        <!-- </transition> -->
        <!-- app-name -->
        <div>
          <p
            :v-show="animate"
            class="text-primary text-h5 faster-one splah-starling-text-animation"
          >
            STARLING
          </p>
        </div>
        <!-- welcome message -->
        <div>
          <p
            :style="{
              letterSpacing: '0.05rem',
              fontSize: '1.05rem',
            }"
            class="text-primary text-bold text-subtitle2 splash-text-button-animation"
          >
            Best hospitality deals right here
          </p>
        </div>
      </div>
      <!-- get-started button -->
      <div
        class="flex row flex-center splash-text-button-animation"
        :style="{
          height: '10.5vh',
          top: '4vh',
          bottom: '0',
          position: 'relative',
        }"
      >
        <q-btn
          class="text-bold text-subtitle1 bg-primary"
          :style="{
            width: '86vw',
            padding: '.8rem',
            color: '#fff',
          }"
          label="Get Started"
          no-caps
          rounded
          filled
          @click="$router.push('/signup')"
        />
      </div>
      <!-- existing account message -->
      <div
        class="flex row justify-center text-primary splash-text-button-animation"
        :style="{
          width: '80vw',
          margin: '2.5rem auto',
        }"
      >
        <p class="text-subtitle1">
          Already have an account?
          <q-btn
            class="text-weight-bolder"
            label="Log in"
            @click="$router.push('/signin')"
            flat
            no-caps
          />
        </p>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const animate = ref(false);

function pageStyleFunc() {
  // "offset" is a Number (pixels) that refers to the total
  // height of header + footer that occupies on screen,
  // based on the QLayout "view" prop configuration

  // this is actually what the default style-fn does in Quasar
  return {
    height: '100vh',
    padding: '0',
    margin: '-40px 0',
    overflowY: 'hidden',
  };
}

onMounted(() => {
  animate.value = true;
});
</script>
<style lang="scss">
@font-face {
  font-family: FasterOne;
  src: url(../css/fonts/FasterOne-Regular.ttf);
}

// declare a class which applies it
.faster-one {
  font-family: 'FasterOne';
}

// declare a keyframe
@keyframes rotateInUpLeft {
  0% {
    transform-origin: left bottom;
    transform: rotate(90deg);
  }
  100% {
    transform-origin: left bottom;
    transform: rotate(0);
  }
}

.splash-starling-animation {
  position: relative;
  width: 9rem;
  height: 9rem;
  transform: translateY(-1rem);
  animation: left-in 4s ease-out;
}

.splah-starling-text-animation {
  position: relative;
  font: 'faster one';
  letter-spacing: '0.01rem';
  line-height: '1rem';
  font-size: '1.6rem';
  margin-bottom: '1.6rem';
  animation: right-in 4s ease-out;
}

.splash-text-button-animation {
  animation: fade-in 4s ease-out;
}

// keyframes
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes left-in {
  0% {
    display: hidden;
    opacity: 0;
  }
  0.00000001% {
    display: hidden;
  }
  1% {
    display: hidden;
    left: -100vw;
    top: 30vh;
  }
  25% {
    left: -100vw;
    top: 30vh;
    background-color: transparent;
    transform: rotateZ(90deg);
  }
  50% {
    left: 0;
    top: 30vh;
    transform: rotateZ(0deg);
  }
  100% {
    left: 0px;
    top: 0px;
  }
}

@keyframes right-in {
  0% {
    display: hidden;
    opacity: 0;
  }
  0.0000000001% {
    display: hidden;
  }
  1% {
    display: hidden;
    left: 100vw;
    top: 30vh;
  }
  25% {
    left: 100vw;
    top: 30vh;
    background-color: transparent;
  }
  50% {
    left: 0;
    top: 30vh;
  }
  100% {
    left: 0px;
    top: 0px;
  }
}
</style>
