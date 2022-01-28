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
    <select class="rounded" :disabled="inputsDisabled">
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
    <input type="range" :disabled="inputsDisabled" />
    <input type="color" :disabled="inputsDisabled" />
    <select :disabled="inputsDisabled">
      <option value="val">val</option>
      <option value="val val">val val</option>
      <option value="val val val">val val val</option>
    </select>
    <textarea :disabled="inputsDisabled"></textarea>
    <div class="mt-1 mb-1">
      <input type="color" value="#0000ff" class="mr color-dot" :disabled="inputsDisabled" />
      <input type="color" value="#00ff00" class="mr color-dot" :disabled="inputsDisabled" />
      <input type="color" value="#ff0000" class="mr color-dot" :disabled="inputsDisabled" />
      <input
        type="color"
        value="#0000ff"
        class="mr color-dot color-dot--round"
        :disabled="inputsDisabled"
      />
      <input
        type="color"
        value="#00ff00"
        class="mr color-dot color-dot--round"
        :disabled="inputsDisabled"
      />
      <input
        type="color"
        value="#ff0000"
        class="mr color-dot color-dot--round"
        :disabled="inputsDisabled"
      />
    </div>

    <label for="">Checkbox/radio/checkbox with role="switch"</label>
    <input type="checkbox" :disabled="inputsDisabled" />
    <input type="checkbox" :disabled="inputsDisabled" aria-invalid="true" />
    <input type="checkbox" :disabled="inputsDisabled" aria-invalid="false" />
    <input type="checkbox" :disabled="inputsDisabled" role="switch" />
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

    <h2>Base input component</h2>
    <base-input
      id="testId"
      label="test label"
      type="email"
      description="this is a small helper text"
      placeholder="placeholder loremasd"
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

    <base-input
      id="testId2"
      label="test label"
      type="range"
      description="this is a small helper text"
      placeholder="placeholder loremasd"
      class="mb-2 mt-2"
      :hasErrors="true"
      errorMessage="Error message lorem"
      prefix="0"
      suffix="10"
      step="2"
      min="0"
      max="10"
      v-model="inputs.range"
      data-attribute-test="asdasd"
      :disabled="inputsDisabled"
    />

    <h2>Textarea component</h2>
    <textarea-custom
      class="mb-2"
      label="Textarea label"
      id="textareaId"
      placeholder="placeholder wow"
      description="helper text lorem ipsum"
      :hasErrors="true"
      errorMessage="an error message is here"
      v-model="inputs.textarea"
      :disabled="inputsDisabled"
      :autoGrow="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';
import TextareaCustom from '@/components/TextareaCustom.vue';

export default defineComponent({
  name: 'ExampleInputs',
  components: {
    BaseInput,
    TextareaCustom,
  },
  data() {
    return {
      inputs: {
        text: '',
        range: '4',
        number: undefined,
        textarea: 'asd\nasd\nasdawd asd \nasd \n\nasd\na',
      },
      inputsDisabled: false,
    };
  },
});
</script>
