<template>
  <div class="container">
    <h2>Form inputs</h2>
    <button class="btn btn--primary btn--block" @click="inputsDisabled = !inputsDisabled">
      Disable inputs: {{ inputsDisabled }}
    </button>
    <label for="">Text</label>
    <input v-model="inputs.text" type="text" placeholder="type text" />
    <input v-model="inputs.text" type="text" placeholder="type text valid" aria-invalid="false" />
    <input v-model="inputs.text" type="text" placeholder="type text invalid" aria-invalid="true" />
    <input v-model="inputs.text" type="text" placeholder="type text disabled" disabled />
    <input
      v-model="inputs.text"
      type="text"
      placeholder="type text disabled valid"
      disabled
      aria-invalid="false"
    />
    <input
      v-model="inputs.text"
      type="text"
      placeholder="type text disabled invalid"
      disabled
      aria-invalid="true"
    />

    <label for="">.rounded</label>
    <input
      v-model="inputs.text"
      type="text"
      placeholder="placeholder"
      class="rounded"
      :disabled="inputsDisabled"
    />
    <input type="color" class="rounded" :disabled="inputsDisabled" />
    <input type="file" class="rounded" :disabled="inputsDisabled" />
    <select name="" id="" class="rounded" :disabled="inputsDisabled">
      <option value="val">val</option>
      <option value="val val">val val</option>
      <option value="val val val">val val val</option>
    </select>

    <label for="">Other "text" inputs</label>
    <input v-model="inputs.text" type="email" placeholder="type email" :disabled="inputsDisabled" />
    <input
      v-model="inputs.text"
      type="search"
      placeholder="type search"
      :disabled="inputsDisabled"
    />
    <input
      v-model="inputs.number"
      type="number"
      placeholder="type number"
      :disabled="inputsDisabled"
    />
    <input
      v-model="inputs.text"
      type="password"
      placeholder="type password"
      :disabled="inputsDisabled"
    />
    <input v-model="inputs.text" type="url" placeholder="type url" :disabled="inputsDisabled" />
    <input v-model="inputs.text" type="tel" placeholder="type tel" :disabled="inputsDisabled" />

    <label for="">Dates</label>
    <input type="date" placeholder="placeholder" :disabled="inputsDisabled" />
    <input type="datetime-local" placeholder="placeholder" :disabled="inputsDisabled" />
    <input type="time" placeholder="placeholder" :disabled="inputsDisabled" />
    <input type="week" placeholder="placeholder" :disabled="inputsDisabled" />

    <label for="">Other</label>
    <input type="file" placeholder="placeholder" :disabled="inputsDisabled" />
    <input type="range" name="" id="" :disabled="inputsDisabled" />
    <input type="color" name="" id="" :disabled="inputsDisabled" />
    <select name="" id="" :disabled="inputsDisabled">
      <option value="val">val</option>
      <option value="val val">val val</option>
      <option value="val val val">val val val</option>
    </select>
    <textarea name="" id="" :disabled="inputsDisabled"></textarea>

    <label for="">Checkbox/radio/checkbox with role="switch"</label>
    <input type="checkbox" name="" id="" :disabled="inputsDisabled" />
    <input type="checkbox" name="" id="" :disabled="inputsDisabled" aria-invalid="true" />
    <input type="checkbox" name="" id="" :disabled="inputsDisabled" aria-invalid="false" />
    <input type="checkbox" name="" id="" :disabled="inputsDisabled" role="switch" />
    <input
      type="checkbox"
      name=""
      id=""
      :disabled="inputsDisabled"
      role="switch"
      aria-invalid="true"
    />
    <input
      type="checkbox"
      name=""
      id=""
      :disabled="inputsDisabled"
      role="switch"
      aria-invalid="false"
    />
    <input type="radio" name="bob" id="" :disabled="inputsDisabled" />
    <input type="radio" name="bob" id="" :disabled="inputsDisabled" />
    <input type="radio" name="bob" id="" :disabled="inputsDisabled" aria-invalid="true" />
    <input type="radio" name="bob" id="" :disabled="inputsDisabled" aria-invalid="false" />

    <label for="">Base input component</label>
    <base-input
      id="testId"
      label="test label"
      type="email"
      description="this is a small helper text"
      placeholder="placeholder lorem"
      class="mb-2 mt-2"
      :hasErrors="true"
      errorMessage="Error message lorem"
      prefix=""
      suffix=".domain.com"
      icon="Filmstrip"
      v-model="inputs.text"
      data-attribute-test="asdasd"
      :disabled="inputsDisabled"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default defineComponent({
  name: 'ExampleInputs',
  components: {
    BaseInput,
  },
  data() {
    return {
      inputs: {
        text: '',
        number: undefined,
      },
      inputsDisabled: false,
    };
  },
});
</script>
