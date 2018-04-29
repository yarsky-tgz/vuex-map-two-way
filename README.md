# vuex-map2way
two way state properties binding for v-model and any other usage (set\get methods generator)

# Installation

```bash
npm i vuex-map2way
```

# Usage

`mapStateTwoWay(targetPath, actionName, propertyNames)`

`targetPath` dot-delimited path to your state property. [dot-prop](https://github.com/sindresorhus/dot-prop) used for it

`actionName` action used for value setting. If you pass array as propertyNames argument 
it shall 

`propertyNames` name (string) or names (array of strings) of target object properties. 

If you pass string as last argument - your action shall receive simple new value, 
otherwise if array given your action shall receive it in 'patch' format:   
{ propertyName: value }

# Examples


## 1. Multiple properties of same object editing
In case you want to edit some properties of some complex object, for example `this.$state.panel.currentUser`

```vue
<template>
  <form>
    <input v-model="login"/>
    <input v-model="password"/>
  </form>
</template>
<script>
  import { mapStateTwoWay } from 'vuex-map2way';
  
  export default {
    computed: {
      ...mapStateTwoWay('panel.currentUser', 'editUser', [
        'login',
        'password'
      ])
    }
  }
</script>
```

Action handling that:
```javascript
export function editUser({ commit }, patch) {
  commit(types.EDIT_USER, patch);
}
```

Mutation:
```javascript
    [types.EDIT_USER](state, patch) {
      state.panel.currentUser = Object.assign({}, state.settings, patch);
    },
```

## 2. Simple property editing

In case you have one property. for example `state.wizard.step` and simple setter action for it:

```vue
<template>
  <button @click.stop="step = ++step">next</button>
</template>
<script>
  import { mapStateTwoWay } from 'vuex-map2way';
  
  export default {
    computed: {
      ...mapStateTwoWay('wizard', 'setWizardStep', 'step')
    }
  }
</script>
```

Action:
```javascript
export function setWizardStep({ commit }, step) {
  commit(types.SET_WIZARD_STEP, step);
}
```

Mutation:
```javascript
[types.SET_WIZARD_STEP](state, step) {
  Vue.set(state.wizard, 'step', step);
}
```

