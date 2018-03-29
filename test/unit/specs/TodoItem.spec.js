
import { shallow, createLocalVue } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem';

const localVue = createLocalVue();
describe('测试TodoItem', () => {
  it('勾选复选框，向父组件传参', () => {
    const wrapper = shallow(TodoItem, {
      localVue,
      propsData: {
        item: {
          isCompleted: false,
          text: '来不及做啦'
        },
        index: 5
      }
    });
    const checkBox = wrapper.find('input[type="checkbox"]');
    checkBox.trigger('click');
    expect(wrapper.emitted('changeStatus')).toBeTruthy();// 断言事件已经被触发
    expect(wrapper.emitted().changeStatus.length).toBe(1); // 断言事件的数量
    expect(wrapper.emitted().changeStatus[0]).toEqual([5]);// 断言事件的有效数据
  });
  it('点击删除并确认，向父组件传参', () => {
    const wrapper = shallow(TodoItem, {
      localVue,
      propsData: {
        item: {
          isCompleted: true,
          text: '来得及吧'
        },
        index: 3
      }
    });
    wrapper.setMethods({
      sure() {
        return true;
      }
    });
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted('delStatus')).toBeTruthy();// 断言事件已经被触发
    expect(wrapper.emitted().delStatus.length).toBe(1); // 断言事件的数量
    expect(wrapper.emitted().delStatus[0]).toEqual([3]);// 断言事件的有效数据
  });
  it('点击删除并取消', () => {
    const wrapper = shallow(TodoItem, {
      localVue,
      propsData: {
        item: {
          isCompleted: true,
          text: '来得及吧'
        },
        index: 3
      }
    });
    wrapper.setMethods({
      sure() {
        return false;
      }
    });
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.emitted('delStatus')).not.toBeTruthy();// 断言事件已经被触发
  });
  it('测试确认框', () => {
    window.confirm = jest.fn();
    window.confirm.mockReturnValue(false);
    const wrapper = shallow(TodoItem, {
      localVue,
      propsData: {
        item: {
          isCompleted: true,
          text: '来得及吧'
        },
        index: 3
      }
    });
    expect(wrapper.vm.sure()).toBe(false);
    expect(window.confirm.mock.calls[0][0]).toEqual('确认删除吗？');
  });
});
