
import { shallow, createLocalVue } from '@vue/test-utils';
import TodoAdd from '@/components/TodoAdd';

const localVue = createLocalVue();
describe('测试TodoAdd', () => {
  beforeEach(() => {
  });
  it('输入框输入123，点击按钮', () => {
    const wrapper = shallow(TodoAdd, {
      localVue
    });
    wrapper.setData({
      todo: 123
    });
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted('add')).toBeTruthy();// 断言事件已经被触发
    expect(wrapper.emitted().add.length).toBe(1); // 断言事件的数量
    expect(wrapper.emitted().add[0]).toEqual([123]);// 断言事件的有效数据
    expect(wrapper.vm.todo).toBe('');
  });
  it('输入框没有输入，点击按钮', () => {
    const wrapper = shallow(TodoAdd, {
      localVue
    });
    const spy = jest.fn();
    window.alert = spy;
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted('add')).not.toBeTruthy();// 断言事件没有被触发
    expect(wrapper.vm.todo).toBe('');
    expect(spy).toHaveBeenCalled();// 测试alert被调用
    expect(spy.mock.calls[0][0]).toEqual('内容不能为空');// 测试alert的内容
  });
});
