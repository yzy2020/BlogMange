import { Vue, Component, Watch } from 'vue-property-decorator';
import { Menu, Icon } from 'ant-design-vue';
import { RouteConfig } from 'vue-router';
import { State, Mutation } from 'vuex-class';

@Component({
  Menu, Icon
})

export default class MenuComponent extends Vue {
  @State('openKeys') private openKeys!: string[];
  private selectedKeys: string[] = [];
  @Mutation('updateOpenKeys') private updateOpenKeys !: (data: string[]) => void;

  // 当前页面的路由name
  private get routeName() {
    return this.$route.name;
  }

  // 菜单切换
  private menuItemChange(key: string) {
    console.log(key);
    if (key === this.routeName) { return }
    this.$router.push({ name: key });
    console.log(this.$router.push({ name: key }));
  }

  private created() {
    this.selectedKeys = this.routeName ? [this.routeName] : [];
  }

  @Watch('$route.name')
  private routeNameChange(value: string | undefined) {
    this.selectedKeys = [value || ''];
  }

  private render() {
    return (
      <Menu style="width: 200px;" mode="inline" theme="light" openKeys={this.openKeys} vModel={this.selectedKeys}
        {...{ on: { 'update:openKeys': this.updateOpenKeys } }}
        onClick={(e: any) => this.menuItemChange(e.key)}>
        <Menu.Item key="Index">
          <Icon type="mail"></Icon>
          首页
        </Menu.Item>
        <Menu.SubMenu>
          <span slot="title"> <Icon type="mail"></Icon><span>用户管理</span></span>
          <Menu.Item key="1">
            角色管理
          </Menu.Item>
          <Menu.Item key="UserInfo">
            用户管理
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
  }
}