# Component FormTable

[![npm](https://img.shields.io/npm/v/quasar-ui-formtable-ext.svg?label=quasar-ui-formtable-ext)](https://www.npmjs.com/package/quasar-ui-formtable-ext)
[![npm](https://img.shields.io/npm/dt/quasar-ui-formtable-ext.svg)](https://www.npmjs.com/package/quasar-ui-formtable-ext)

# Component FormTable
> Short description of the component


# Usage

## Quasar CLI project

Install the [App Extension](../app-extension).

**OR**:

Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-formtable-ext'

Vue.use(Plugin)
```

**OR**:

```html
<script>
import { Component as FormTable } from 'quasar-ui-formtable-ext'

export default {
  components: {
    FormTable
  }
}
</script>
```

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-formtable-ext'

Vue.use(Plugin)
```

**OR**:

```html
<script>
import { Component as FormTable } from 'quasar-ui-formtable-ext'

export default {
  components: {
    FormTable
  }
}
</script>
```

## UMD variant

Exports `window.qFormtable`.

Add the following tag(s) after the Quasar ones:

```html
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/quasar-ui-formtable-ext/dist/index.umd.min.js"></script>
</body>
```

# Setup
```bash
$ yarn
```

# Developing
```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

# Building package
```bash
$ yarn build
```

# Adding Testing Components
in the `ui/dev/src/pages` you can add Vue files to test your component/directive. When using `yarn dev` to build the UI, any pages in that location will automatically be picked up by dynamic routing and added to the test page.

# Adding Assets
If you have a component that has assets, like language or icon-sets, you will need to provide these for UMD. In the `ui/build/script.javascript.js` file, you will find a couple of commented out commands that call `addAssets`. Uncomment what you need and add your assets to have them be built and put into the `ui/dist` folder.

# Donate
If you appreciate the work that went into this, please consider [donating to Quasar](https://donate.quasar.dev).

# License
MIT (c) John Robinson <johnrob1880@gmail.com>
