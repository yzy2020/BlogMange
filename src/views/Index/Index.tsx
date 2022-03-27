import { Vue, Component } from 'vue-property-decorator';
import { Layout } from 'ant-design-vue';

@Component({
  name: 'Index'
})
export default class Index extends Vue{

  private render() {
    return (
      <div>欢迎来到，我的博客后台管理系统</div>
    )
  }
}