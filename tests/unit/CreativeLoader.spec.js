import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from "element-ui";
import {registerFA} from '@/fontawesome.config'
import CreativeLoader from "@/components/CreativeLoader.vue"

let localVue = createLocalVue();
localVue.use(ElementUI);
registerFA(localVue);

describe('CreativeLoader.vue', () => {
    it('check landscape only device modes shown when banner type', () => {
        const bannerModeWrapper = shallowMount(CreativeLoader, {localVue, propsData: {
                type: 'banner'
            }});

        bannerModeWrapper.vm.devices.forEach(device => expect(device.mode.landscape).toBeTruthy());
    })
});
