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
        ref="signinFormRef"
        :style="{ width: '100%' }"
      >
        <!-- email -->
        <q-input
          outlined
          rounded
          bg-color="secondary"
          v-model="signinModel.email"
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
          v-model="signinModel.password"
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
          label="Sign in"
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
      class="text-center q-md-sm text-primary"
      :style="{
        fontSize: '1.1rem',
        fontWeight: '600',
        marginTop: '12rem',
      }"
    >
      <p class="text-subtitle1">
        Dont have an account?
        <q-btn
          class="text-weight-bolder"
          label="Sign up"
          @click="$router.push('/signup')"
          flat
          no-caps
        />
      </p>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { asyncComputed } from '@vueuse/core';
import { inject } from 'vue';
import { EventBus, QForm, useQuasar } from 'quasar';
import { clearUIEffects, isModelValid } from 'src/lib/utils';
import { onBeforeUnmount } from 'vue';
import { EventNamesEnum } from 'src/lib/enums/eventNames.enum';
import { SigninModel } from 'src/models/Signin.model';
import { SigninHandler } from 'src/handlers/Signin.handler';

// event bus
const eventBus = inject('eventBus') as EventBus;

// handlers
SigninHandler.handleSignin(eventBus);

// models
const signinModel = reactive(new SigninModel());

// consts
const $q = useQuasar();

// variables
let timer: NodeJS.Timeout;

// refs
const signinFormRef = ref<QForm>();
const passwordShow = ref(false);

// computed
asyncComputed(() => {
  signinModel.validate();
});

// methods
async function submit() {
  // validate form
  await signinModel.validate();
  if (!isModelValid(signinModel)) {
    return;
  }

  $q.loading.show({ message: 'Signing in ...' });
  eventBus.emit(EventNamesEnum.SIGN_IN, signinModel);
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
