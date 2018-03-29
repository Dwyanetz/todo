
import { shallow, createLocalVue } from '@vue/test-utils';
import TodoList from '@/views/TodoList';

const localVue = createLocalVue();
describe('测试TodoList', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem.mockClear();
  });
  it('从本地缓存读取数据', () => {
    const KEY = 'todoData';
    const VALUE = '[{"text":"我是待办事项","isCompleted":false}]';
    localStorage.setItem(KEY, VALUE);
    const wrapper = shallow(TodoList, {
      localVue
    });
    expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY); // 获取本地缓存方法被调用
    expect(wrapper.vm.todos).toEqual([
      { text: '我是待办事项', isCompleted: false }
    ]);
  });
  it('添加一个事项', () => {
    const wrapper = shallow(TodoList, {
      localVue
    });
    const newTodo = '我是待办事项';
    wrapper.vm.addTodo(newTodo);
    expect(wrapper.vm.todos).toEqual([
      { text: '我是待办事项', isCompleted: false }
    ]);
    const KEY = 'todoData';
    const VALUE = JSON.stringify(wrapper.vm.todos);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE); // 设置本地缓存方法被调用
  });
  it('改变待处理或者已完成的状态', () => {
    const wrapper = shallow(TodoList, {
      localVue
    });
    wrapper.setData({
      todos: [{ text: '我是待办事项', isCompleted: false }]
    });
    wrapper.vm.changeArr(0);
    expect(wrapper.vm.todos[0].isCompleted).toBe(true);
    const KEY = 'todoData';
    const VALUE = JSON.stringify(wrapper.vm.todos);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE); // 设置本地缓存方法被调用
  });
  it('删除一个事项', () => {
    const wrapper = shallow(TodoList, {
      localVue
    });
    wrapper.setData({
      todos: [{ text: '我是待办事项', isCompleted: false }]
    });
    wrapper.vm.delArr(0);
    expect(wrapper.vm.todos.length).toBe(0);
    const KEY = 'todoData';
    const VALUE = JSON.stringify(wrapper.vm.todos);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE); // 设置本地缓存方法被调用
  });
});
