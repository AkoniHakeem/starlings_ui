<template>
  <q-page
    :style="{
      height: '100vh',
      padding: '1rem',
    }"
  >
    <div class="flex column items-start q-mt-xl q-mb-md">
      <q-btn
        :style="{
          padding: '0',
          fontSize: '1rem',
        }"
        class="self-start"
        flat
        icon="arrow_back"
        @click="$router.push('/')"
      />
      <p class="text-h5 text-weight-bolder q-mt-md q-ml-sm">Sign up</p>
    </div>
    <div class="flex column flex-center">
      <q-form
        @submit.prevent=""
        class="q-gutter-md"
        ref="signupFormRef"
        :style="{ width: '100%' }"
      >
        <q-input
          :style="{ color: `${$getColor('dark')}` }"
          rounded
          outlined
          bg-color="secondary"
          v-model="signupModel.firstName"
          label-slot
        >
          <template v-slot:label>
            <span class="q-px-md"> First Name</span>
          </template>
        </q-input>

        <!-- lastName -->
        <q-input
          outlined
          rounded
          bg-color="secondary"
          v-model="signupModel.lastName"
          label-slot
        >
          <template v-slot:label>
            <span class="q-px-md"> Last Name</span>
          </template>
        </q-input>

        <!-- email -->
        <q-input
          outlined
          rounded
          bg-color="secondary"
          v-model="signupModel.email"
          label-slot
        >
          <template v-slot:label>
            <span class="q-px-md"> Email</span>
          </template>
        </q-input>

        <!-- password -->
        <q-input
          outlined
          rounded
          bg-color="secondary"
          v-model="signupModel.password"
          label="Password"
          :type="passwordShow ? 'text' : 'password'"
          label-slot
        >
          <template v-slot:label>
            <span class="q-px-md"> Password</span>
          </template>
          <template v-slot:append>
            <q-btn
              :icon="passwordShow ? 'visibility_off' : 'visibility'"
              @click="passwordShow = !passwordShow"
              class="cursor-pointer"
              flat
            />
          </template>
        </q-input>

        <q-input
          outlined
          rounded
          bg-color="secondary"
          v-model="signupModel.confirmPassword"
          :type="confirmPasswordShow ? 'text' : 'password'"
          label="Confirm Password"
        >
          <template v-slot:label>
            <span class="q-px-md">Confirm Password</span>
          </template>
          <template v-slot:append>
            <q-btn
              :icon="confirmPasswordShow ? 'visibility_off' : 'visibility'"
              @click="confirmPasswordShow = !confirmPasswordShow"
              class="cursor-pointer"
              flat
            />
          </template>
        </q-input>

        <!-- submit -->
        <q-btn
          class="bg-primary text-white text-bold q-mt-lg q-py-md"
          type="submit"
          rounded
          :style="{
            minWidth: '90vw',
            width: 'auto',
          }"
          color="primary"
          label="Sign up"
          no-caps
          @click="submit"
        />
      </q-form>
    </div>
    <div class="text-center q-mt-lg q-mb-sm"><p>Or</p></div>
    <div class="flex row justify-evenly">
      <q-btn
        icon="facebook"
        color="primary"
        flat
        :style="{ fontSize: '1.5rem' }"
      />
      <q-btn icon="mail" color="primary" flat :style="{ fontSize: '1.5rem' }" />
      <q-btn
        icon="fa-brands fa-twitter"
        color="primary"
        flat
        :style="{ fontSize: '1.5rem' }"
      />
    </div>
    <div
      class="text-center q-my-lg text-primary text-italic"
      :style="{
        fontSize: '1.1rem',
        fontWeight: '600',
      }"
    >
      <p class="q-mb-xs">By signing up, you agreed with our Terms of</p>
      <p>Services and Privacy Policy</p>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { SignupModel } from '../models/Signup.model';
import { asyncComputed } from '@vueuse/core';
import { SignupHandler } from '../handlers/Signup.handler';
import { inject } from 'vue';
import { EventBus, QForm, useQuasar } from 'quasar';
import { clearUIEffects, isModelValid } from 'src/lib/utils';
import { onBeforeUnmount } from 'vue';
import { EventNamesEnum } from 'src/lib/enums/eventNames.enum';

// event bus
const eventBus = inject('eventBus') as EventBus;

// handlers
SignupHandler.handleSignup(eventBus);

// models
const signupModel = reactive(new SignupModel());

// consts
const $q = useQuasar();

// variables
let timer: NodeJS.Timeout;

// refs
const signupFormRef = ref<QForm>();
const passwordShow = ref(false);
const confirmPasswordShow = ref(false);

// computed
asyncComputed(() => {
  signupModel.validate();
});

// methods
async function submit() {
  // validate form
  await signupModel.validate();
  if (!isModelValid(signupModel)) {
    return;
  }

  $q.loading.show({ message: 'Creating account...' });
  eventBus.emit(EventNamesEnum.SIGN_UP, signupModel);
  timer = setTimeout(() => {
    $q.loading.hide();
  }, 10000);
}

// hooks
onBeforeUnmount(() => {
  clearUIEffects({ loader: $q.loading, timer });
  eventBus.off(EventNamesEnum.SIGN_UP);
});
</script>
