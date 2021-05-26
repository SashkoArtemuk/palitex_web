import { mount } from '@vue/test-utils';
import TheHeader from '../components/the_header.vue';

describe('Test', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(TheHeader, {
            propsData: {
                isAutenticated: false
            }
        });
        expect(wrapper.isVueInstance()).toBeTruthy();

    });
});

