import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUsers, faImages, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons'

library.add(
    faUsers, faImages, faMobileAlt, faTabletAlt
);

export function registerFA(vueInstance) {
    vueInstance.component('font-awesome-icon', FontAwesomeIcon);
}

