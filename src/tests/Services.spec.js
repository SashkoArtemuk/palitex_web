import { mount } from '@vue/test-utils';
import apiService from '../services/api_service';
import { setToken } from '../services/api_service';

describe('Test', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(apiService, {
        });
        setToken('123');
        expect(wrapper.isVueInstance()).toBeTruthy();

    });
});


