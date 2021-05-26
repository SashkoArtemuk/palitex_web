import { mount } from '@vue/test-utils';
import BaseNotification from '../components/base_notification.vue';

describe('Test', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(BaseNotification, {
            propsData: {
                type: "info"
            }
        });
        expect(wrapper.isVueInstance()).toBeTruthy();

    });
});
