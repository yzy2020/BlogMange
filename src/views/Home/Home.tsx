import { Vue, Component } from 'vue-property-decorator';
import { Layout, Breadcrumb, Tabs, Icon } from 'ant-design-vue';
import { HeaderComponent, MenuComponent } from '@/components/Common';

@Component({
  name: 'Home',
  components: { HeaderComponent, MenuComponent }
})

export default class Home extends Vue {
  private Height = NaN;
  private created() {
    console.log(document.documentElement.clientWidth);
    this.Height = document.documentElement.clientWidth;
  }

  private render() {
    return (
      <Layout>
        <HeaderComponent />
        <Layout>
          <Layout.Sider style="max-width: 200px;">
            <MenuComponent />
          </Layout.Sider>
          <Layout style={{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: (this.Height / 2) + 'px' }}>
            <Layout.Content>
              <router-view></router-view>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}